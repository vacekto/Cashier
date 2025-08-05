import { MenuItem } from "./MenuItem";
import { MenuItemDTO } from "../types/API";

export class Meal implements MenuItem {
  name: string;
  price: number;
  type: "MEAL";
  id: string;
  weight: number;

  constructor(arg: MenuItemDTO) {
    this.name = arg.name;
    this.price = arg.price;
    this.type = "MEAL";
    this.id = arg.id;
    this.weight = arg.weight!;
  }

  get describtion() {
    return `${this.name}, ${this.weight} g`;
  }
}
