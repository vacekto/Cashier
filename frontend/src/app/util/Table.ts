import { OrderedItem, TableDTO } from "./types";

export class Table {
  id: string;
  describtion: string;
  items: OrderedItem[];

  constructor(DTO: TableDTO) {
    this.id = DTO.id;
    this.describtion = DTO.describtion;
    this.items = [...DTO.items];
  }

  get price() {
    let sum = 0;
    for (const item of this.items) {
      sum += item.price * item.count;
    }
    return sum;
  }
}
