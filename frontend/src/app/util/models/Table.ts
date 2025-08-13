import { Drink } from "./Drink";
import { Meal } from "./Meal";
import { TableDTO } from "../types/APItypes";
import { OrderedItem } from "../types/apptypes";

export class Table {
  id: string;
  describtion: string;
  items: OrderedItem[];

  constructor(dto: TableDTO) {
    this.id = dto.id;
    this.describtion = dto.describtion;
    const menuItems: OrderedItem[] = [];

    for (const item of dto.items) {
      const present = menuItems.find((i) => i.menuItem.id === item.menuItem.id);
      if (present) {
        present.count += item.count;
        continue;
      }

      const instance =
        item.menuItem.type === "DRINK"
          ? new Drink(item.menuItem)
          : new Meal(item.menuItem);
      menuItems.push({ menuItem: instance, count: item.count });
    }
    this.items = menuItems;
  }

  updateItems(itemsUpdate: OrderedItem[]) {
    this.items = itemsUpdate;
  }

  get price() {
    let sum = 0;
    for (const item of this.items) {
      sum += item.menuItem.price * item.count;
    }
    return sum.toFixed(2);
  }
}
