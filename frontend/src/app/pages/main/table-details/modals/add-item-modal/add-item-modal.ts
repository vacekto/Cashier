import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  signal,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StateService } from "../../../../../services/state-service";
import { FilteredInput } from "../../../../../components/filtered-input/filtered-input";
import { ToastService } from "../../../../../services/toast-service";
import { DataService } from "../../../../../services/data-service";
import { Modal } from "bootstrap";
import { ItemDTO, OrderDTO } from "../../../../../util/types/APItypes";
import { OrderedItem } from "../../../../../util/types/apptypes";

@Component({
  selector: "app-add-item-modal",
  imports: [FormsModule, CommonModule, FilteredInput],
  templateUrl: "./add-item-modal.html",
  styleUrl: "./add-item-modal.scss",
})
export class AddItemModal implements AfterViewInit {
  @ViewChild("addItemModal", { static: false })
  modalElement!: ElementRef<HTMLElement>;
  modalInstance!: Modal;

  orders = signal<OrderedItem[]>([]);
  isButtonDisabled = computed(() => this.orders().length === 0);
  menuItemsStr: string[] = [];

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

  ngAfterViewInit() {
    this.modalInstance = Modal.getOrCreateInstance(
      this.modalElement.nativeElement,
    );
  }

  increment(id: string) {
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
    let isSome = this.orders().some((i) => i.menuItem.id === item.id);
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

    const orderedItems: ItemDTO[] = this.orders().map((item) => ({
      menuItemId: item.menuItem.id,
      count: item.count,
    }));

    const newOrder: OrderDTO = {
      orderedItems,
      tableId,
    };

    this.data.sendNewOrder(newOrder);
    this.modalInstance.hide();
    this.orders.set([]);
  };
}
