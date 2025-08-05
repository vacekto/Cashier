import { Component, ViewChild } from "@angular/core";
import { Tables } from "./tables/tables";
import { TableDetails } from "./table-details/table-details";
import { CreateWaiterModal } from "./modals/create-waiter-modal/create-waiter-modal";
import { CreateTableModal } from "./modals/create-table-modal/create-table-modal";
import { Waiters } from "./waiters/waiters";

@Component({
  selector: "app-main",
  imports: [Tables, TableDetails, CreateWaiterModal, CreateTableModal, Waiters],
  templateUrl: "./main.html",
  styleUrl: "./main.scss",
})
export class Main {
  @ViewChild(CreateTableModal) tableModalComp!: CreateTableModal;
  @ViewChild(CreateWaiterModal) waiterModalComp!: CreateWaiterModal;

  public showTableModal() {
    this.tableModalComp.modalInstance.show();
  }

  public showWaiterModal() {
    this.waiterModalComp.modalInstance.show();
  }
}
