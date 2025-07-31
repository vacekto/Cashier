import { CommonModule } from "@angular/common";
import { Component, computed, effect, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StateService } from "../../../services/state-service";
import { FilteredInput } from "../../../util/filtered-input/filtered-input";
import { ToastService } from "../../../services/toast-service";
import { MenuItem, OrderedItem } from "../../../util/types";

@Component({
  selector: "app-add-item-modal",
  imports: [FormsModule, CommonModule, FilteredInput],
  templateUrl: "./add-item-modal.html",
  styleUrl: "./add-item-modal.scss",
})
export class AddItemModal {
  constructor(
    public state: StateService,
    public toast: ToastService,
  ) {
    effect(() => {
      const menu = this.state.menu();
      this.menuItemsStr = menu.map((item) => item.describtion);
    });
  }

  orders = signal<(MenuItem & { count: number })[]>([]);
  isButtonDisabled = computed(() => this.orders().length === 0);
  menuItemsStr: string[] = [];

  increment(id: string) {
    this.orders.update((prev) => {
      const order = prev.find((o) => o.id === id);
      if (!order) return prev;
      order.count++;
      return [...prev];
    });
  }

  decrement(id: string) {
    this.orders.update((prev) => {
      const order = prev.find((o) => o.id === id);
      if (!order) return prev;
      if (order.count == 1) return prev.filter((o) => o.id !== id);
      order.count--;
      return [...prev];
    });
  }

  addItem = (index: number) => {
    if (index === -1) return;
    let item = this.state.menu()[index];
    let isSome = this.orders().some((o) => o.id === item.id);
    if (isSome)
      this.toast.addToast(
        item.name,
        `${item.describtion} is already ordered`,
        "WARNING",
      );
    if (!isSome)
      this.orders.update((orders) => [...orders, { ...item, count: 1 }]);
  };

  submit = () => {
    console.log("submitting");
  };
}
