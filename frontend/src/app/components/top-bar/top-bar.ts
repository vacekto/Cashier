import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StateService } from "../../services/state-service";
import { CreateTableModal } from "./modals/create-table-modal/create-table-modal";
import { CreateWaiterModal } from "./modals/create-waiter-modal/create-waiter-modal";

@Component({
  selector: "app-top-bar",
  imports: [FormsModule, CommonModule, CreateTableModal, CreateWaiterModal],
  templateUrl: "./top-bar.html",
  styleUrl: "./top-bar.scss",
})
export class TopBar {
  @ViewChild(CreateTableModal) tableModalComp!: CreateTableModal;
  @ViewChild(CreateWaiterModal) waiterModalComp!: CreateWaiterModal;

  constructor(public state: StateService) {}

  public showTableModal() {
    this.tableModalComp.modalInstance.show();
  }

  public showWaiterModal() {
    this.waiterModalComp.modalInstance.show();
  }
}
