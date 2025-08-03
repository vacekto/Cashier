import { CommonModule } from "@angular/common";
import { Component, computed, effect, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StateService } from "../../../../services/state-service";
import { FilteredInput } from "../../../../util/filtered-input/filtered-input";
import { ToastService } from "../../../../services/toast-service";
import { NewItemDTO, NewOrderDTO, OrderedItem } from "../../../../util/types";
import { DataService } from "../../../../services/data-service";

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
    public data: DataService,
  ) {
    effect(() => {
      const menu = this.state.menu();
      this.menuItemsStr = menu.map((item) => item.describtion);
    });
  }

  orders = signal<OrderedItem[]>([]);
  isButtonDisabled = computed(() => this.orders().length === 0);
  menuItemsStr: string[] = [];

  increment(id: string) {
    console.log(this.orders());
    this.orders.update((prev) => {
      const order = prev.find((item) => item.menuItem.id === id);
      if (!order) return prev;
      order.count++;
      return [...prev];
    });
  }

  decrement(id: string) {
    this.orders.update((prev) => {
      const order = prev.find((item) => item.menuItem.id === id);
      if (!order) return prev;
      if (order.count == 1)
        return prev.filter((item) => item.menuItem.id !== id);
      order.count--;
      return [...prev];
    });
  }

  addItem = (index: number) => {
    if (index === -1) return;
    let item = this.state.menu()[index];
    let isSome = this.orders().some(
      (item) => item.menuItem.id === item.menuItem.id,
    );
    if (isSome)
      this.toast.addToast(
        item.name,
        `${item.describtion} is already ordered`,
        "WARNING",
      );
    if (!isSome) {
      const newItem: OrderedItem = {
        menuItem: item,
        count: 1,
      };

      this.orders.update((orders) => [...orders, newItem]);
    }
  };

  submit = () => {
    const tableId = this.state.selectedTable()?.id;
    if (!tableId) return;

    const orderedItems: NewItemDTO[] = this.orders().map((item) => ({
      menuItemId: item.menuItem.id,
      count: item.count,
    }));

    const newOrder: NewOrderDTO = {
      orderedItems,
      tableId,
    };

    this.data.sendNewOrder(newOrder);
  };
}
