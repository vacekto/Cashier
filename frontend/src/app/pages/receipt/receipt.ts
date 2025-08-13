import {
  Component,
  ViewChild,
  ViewContainerRef,
  computed,
} from "@angular/core";
import { StateService } from "../../services/state-service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CommonModule } from "@angular/common";
import { MenuItemDTO } from "../../util/types/APItypes";
import { Router } from "@angular/router";

@Component({
  selector: "app-receipt",
  imports: [CommonModule],
  templateUrl: "./receipt.html",
  styleUrls: ["./receipt.scss"],
})
export class Receipt {
  @ViewChild("pdfContainer", { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(
    public state: StateService,
    private router: Router,
  ) {}

  test = 1;
  vats = computed(() => {
    const entries: [string, number][] = [];
    const vats = this.state.receipt()?.vats!;
    Object.keys(vats).forEach((key) => {
      entries.push([key, vats[key]]);
    });
    return entries;
  });

  itemDescribtion(item: MenuItemDTO) {
    return item.type === "DRINK"
      ? `${item.name}, ${item.volume} l`
      : `${item.name}, ${item.weight} g`;
  }

  back() {
    this.router.navigate(["/"]);
  }

  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formatted = `${day}-${month}-${year} ${hours}:${minutes}`;

    return formatted;
  }

  downloadReceipt() {
    const element = document.getElementById("receipt");
    if (!element) return;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // portrait, millimeters, A4

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, pdfHeight);

      pdf.save("receipt.pdf");
    });
  }
}
