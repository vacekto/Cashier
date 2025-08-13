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

  submit(form: any) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }

    const describtion = this.tableDescripbtion.trim();
    if (this.state.tables().some((t) => t.describtion === describtion)) {
      this.errorMsg = `Table description "${describtion}" is already taken`;
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      console.log("cosikdosi");
      return;
    }

    this.data.createTable(describtion);
    this.modalInstance.hide();

    this.errorMsg = "";
    this.tableDescripbtion = "";
    form.resetForm();
  }
}
