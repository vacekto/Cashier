import { Component, computed, effect, OnInit, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StateService } from "../../services/state-service";
import { ToastService } from "../../services/toast-service";
import { Router } from "@angular/router";
import { OrderedItem } from "../../util/types/app";

@Component({
  selector: "app-payment",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./payment.html",
  styleUrl: "./payment.scss",
})
export class Payment implements OnInit {
  constructor(
    public state: StateService,
    public toasts: ToastService,
    private router: Router,
  ) {
    effect(() => {
      const selectedTable = this.state.selectedTable();
      if (!selectedTable) return;
      const orderedItems = selectedTable.items.map((i) => ({ ...i }));
      this.orderItems.set(orderedItems);
    });
  }

  ngOnInit(): void {
    if (!this.state.selectedTable()) this.router.navigate(["/"]);
  }

  orderItems = signal<OrderedItem[]>([]);
  receiptItems = signal<OrderedItem[]>([]);

  receiptPrice = computed(() => {
    let price = 0;
    for (let item of this.receiptItems()) {
      price += item.menuItem.price * item.count;
    }

    return price;
  });

  test() {}

  addSingleItemToReceipt(itemId: string) {
    const idx = this.orderItems().findIndex((i) => i.menuItem.id === itemId)!;
    const item = this.orderItems()[idx];

    item.count--;
    const orderItemsUpdate = this.orderItems().map((i) => ({ ...i }));
    if (item.count === 0) orderItemsUpdate.splice(idx, 1);
    this.orderItems.set(orderItemsUpdate);

    const receiptItem = this.receiptItems().find(
      (i) => i.menuItem.id === itemId,
    );

    if (receiptItem) {
      receiptItem.count++;
      this.receiptItems.update((prev) => [...prev]);
      return;
    }

    this.receiptItems.update((prev) => {
      const update = prev.map((i) => ({ ...i }));
      const newItem = {
        count: 1,
        menuItem: item.menuItem,
      };
      update.push(newItem);

      return update;
    });
  }

  addAllItemsToReceipt(itemId: string) {
    const idx = this.orderItems().findIndex((i) => i.menuItem.id === itemId)!;
    const item = this.orderItems()[idx];

    const update = this.orderItems().map((i) => ({ ...i }));
    update.splice(idx, 1);

    this.orderItems.set(update);

    const receiptItem = this.receiptItems().find(
      (i) => i.menuItem.id === itemId,
    );

    if (receiptItem) {
      receiptItem.count += item.count;
      return;
    }

    this.receiptItems.update((prev) => {
      const update = prev.map((i) => ({ ...i }));
      update.push({ ...item });
      return update;
    });
  }

  addEverything() {
    const update = this.receiptItems().map((i) => ({ ...i }));

    for (const item of this.orderItems()) {
      const receiptItem = update.find(
        (i) => i.menuItem.id === item.menuItem.id,
      );

      if (receiptItem) receiptItem.count += item.count;
      else update.push(item);
    }
    this.orderItems.set([]);
    this.receiptItems.set(update);
  }

  back() {
    this.router.navigate(["/"]);
  }

  pay() {
    if (!this.state.paymentMethod()) {
      this.toasts.addToast(
        "Payment method not selected",
        "Payment method must be selected",
        "WARNING",
      );
      return;
    }

    if (+this.receiptPrice === 0) {
      this.toasts.addToast(
        "Nothing to pay",
        "Payment method must be selected",
        "WARNING",
      );
      return;
    }
  }
}
