import { MenuItem } from "./MenuItem";
import { MenuItemDTO } from "./types";

export class Drink implements MenuItem {
  name: string;
  price: number;
  type: "DRINK";
  id: string;
  volume: number;

  constructor(arg: MenuItemDTO) {
    this.name = arg.name;
    this.price = arg.price;
    this.type = "DRINK";
    this.id = arg.id;
    this.volume = arg.volume!;
  }

  get describtion() {
    return `${this.name}, ${this.volume}, g`;
  }
}
