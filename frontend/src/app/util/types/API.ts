import { PaymentMethod } from "./app";

export type MenuItemDTO = {
  name: string;
  price: number;
  type: "MEAL" | "DRINK";
  id: string;
  volume?: number;
  weight?: number;
};

export type MenuDTO = {
  meals: MenuItemDTO[];
  drinks: MenuItemDTO[];
};

export type TableDTO = {
  id: string;
  describtion: string;
  items: {
    menuItem: MenuItemDTO;
    createdAt: string;
    // count: number;
  }[];
};

export type NewOrderDTO = {
  tableId: string;
  orderedItems: NewItemDTO[];
};

export type NewItemDTO = {
  menuItemId: string;
  count: number;
};

export type ReceiptDTO = {
  tableId: string;
  tableDescribtion: string;
  items: NewItemDTO[];
  waiter: string;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  returned: number;
};
