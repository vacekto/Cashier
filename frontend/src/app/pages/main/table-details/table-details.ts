import { Component, ViewChild } from "@angular/core";
import { StateService } from "../../../services/state-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AddItemModal } from "./modals/add-item-modal/add-item-modal";
import { Router } from "@angular/router";
import { ToastService } from "../../../services/toast-service";

@Component({
  selector: "app-table-details",
  imports: [FormsModule, CommonModule, AddItemModal],
  templateUrl: "./table-details.html",
})
export class TableDetails {
  @ViewChild(AddItemModal) tableModalComp!: AddItemModal;

  constructor(
    public state: StateService,
    private router: Router,
    public toasts: ToastService,
  ) {
    state.tables();
    state.selectedTable();
  }

  get toolbarPayMsg(): string | null {
    return null;
  }

  get selectedTableId(): string | null {
    return this.state.selectedTable()?.id ?? null;
  }

  set selectedTableId(id: string) {
    if (id !== null && id !== this.state.selectedTable()?.id) {
      this.state.selectTable(id);
    }
  }
  get selectedItems() {
    return this.state.selectedTable()?.items ?? [];
  }

  addItem() {
    if (!this.state.selectedTable()) {
      this.toasts.addToast(
        "table not selected",
        "Table must be selected first",
        "WARNING",
      );
      return;
    }
    this.tableModalComp.modalInstance.show();
  }

  finalize() {
    if (!this.state.selectedTable()) {
      this.toasts.addToast(
        "table not selected",
        "Table must be selected first",
        "WARNING",
      );
      return;
    }

    if (+this.state.selectedTable()!.price === 0) {
      this.toasts.addToast(
        "price zero",
        "Selected table has no orders",
        "WARNING",
      );
      return;
    }

    if (!this.state.selectedWaiterId()) {
      this.toasts.addToast(
        "no waiter selected",
        "Waiter finalizing the payment must be selected",
        "WARNING",
      );
      return;
    }
    this.router.navigate(["/payment"]);
  }

  addItemModal = false;
  selectedItem: any = null;
}
