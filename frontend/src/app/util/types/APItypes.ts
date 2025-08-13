import { MenuItem } from "../models/MenuItem";
import { PAYMENT_METHOD } from "./apptypes";

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
    count: number;
  }[];
};

export type OrderDTO = {
  tableId: string;
  orderedItems: ItemDTO[];
};

export type ItemDTO = {
  menuItemId: string;
  count: number;
};

export type ReceiptDTO = {
  tableId: string;
  tableDescribtion: string;
  items: ItemDTO[];
  waiter: string;
  paymentMethod: PAYMENT_METHOD;
  totalPrice: number;
  paidAmount: number;
};
