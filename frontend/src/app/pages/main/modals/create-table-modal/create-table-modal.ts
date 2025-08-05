import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StateService } from "../../../../services/state-service";
import { DataService } from "../../../../services/data-service";
import { Modal } from "bootstrap";

@Component({
  selector: "app-create-table-modal",
  imports: [FormsModule, CommonModule],
  templateUrl: "./create-table-modal.html",
})
export class CreateTableModal implements AfterViewInit {
  @ViewChild("newTableModal", { static: false })
  modalElement!: ElementRef<HTMLElement>;
  modalInstance!: Modal;

  tableDescripbtion = "";
  errorMsg = "";

  constructor(
    public state: StateService,
    public data: DataService,
  ) {}

  ngAfterViewInit() {
    this.modalInstance = Modal.getOrCreateInstance(
      this.modalElement.nativeElement,
    );
  }

  submit() {
    const describtion = this.tableDescripbtion;
    if (describtion.trim().length < 6) {
      this.errorMsg = "Table describtion needs to include at least 6 symbols";
      return;
    }

    if (this.state.tables().some((w) => w.describtion === describtion)) {
      this.errorMsg = `Table describtion "${describtion}" is already taken`;
      return;
    }

    this.data.createTable(this.tableDescripbtion);
    this.modalInstance.hide();

    this.errorMsg = "";
    this.tableDescripbtion = "";
  }
}
