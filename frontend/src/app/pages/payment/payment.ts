import { Component, computed, effect, OnInit, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StateService } from "../../services/state-service";
import { ToastService } from "../../services/toast-service";
import { Router } from "@angular/router";
import { OrderedItem } from "../../util/types/apptypes";
import { DataService } from "../../services/data-service";
import { ItemDTO, ReceiptDTO } from "../../util/types/APItypes";

@Component({
  selector: "app-payment",
  imports: [CommonModule, FormsModule],
  templateUrl: "./payment.html",
  styleUrl: "./payment.scss",
})
export class Payment implements OnInit {
  form = new FormGroup({
    age: new FormControl("", [Validators.required, Validators.min(18)]),
  });

  orderItems = signal<OrderedItem[]>([]);
  receiptItems = signal<OrderedItem[]>([]);
  paidAmount = 0;
  receiptPrice = computed(() => {
    let price = 0;
    for (let item of this.receiptItems()) {
      price += item.menuItem.price * item.count;
    }

    return price;
  });
  errorMsg: string | null = null;

  constructor(
    public state: StateService,
    public data: DataService,
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
    const update = this.orderItems().map((i) => ({ ...i }));
    const item = this.orderItems()[idx];
    update.splice(idx, 1);

    this.orderItems.set(update);

    const receiptItem = this.receiptItems().find(
      (i) => i.menuItem.id === itemId,
    );

    if (receiptItem) {
      receiptItem.count += item.count;
      this.receiptItems.update((prev) => [...prev]);
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

  async pay() {
    if (this.receiptPrice() > this.paidAmount) {
    }

    const isValid = !isNaN(Number(this.paidAmount));
    if (!isValid) {
      // this.errorMsg = "";
    }

    const items: ItemDTO[] = this.receiptItems().map((i) => ({
      count: i.count,
      menuItemId: i.menuItem.id,
    }));

    const paymentMethod = this.state.paymentMethod();
    if (!paymentMethod) throw new Error("no payment selected");

    const totalPrice = this.receiptItems().reduce(
      (acc, item) => acc + item.menuItem.price * item.count,
      0,
    );

    const receipt: ReceiptDTO = {
      items,
      paymentMethod,
      tableDescribtion: this.state.selectedTable()!.describtion,
      tableId: this.state.selectedTable()!.id,
      totalPrice: totalPrice,
      waiter: this.state.selectedWaiter()!.name,
      paidAmount: this.paidAmount,
    };

    const result = await this.data.sendReceipt(receipt);
    this.state.setReceipt(result);
    this.router.navigate(["receipt"]);
  }
}
