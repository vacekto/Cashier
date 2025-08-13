import { MenuItem } from "../models/MenuItem";
import { ItemDTO, MenuItemDTO } from "./APItypes";

export type OrderedItem = {
  menuItem: MenuItem;
  count: number;
};

export type OrderedItemDTO = {
  menuItem: MenuItemDTO;
  count: number;
};

export type Waiter = {
  name: string;
  id: string;
};

export type Receipt = {
  tableDescribtion: string;
  items: OrderedItemDTO[];
  waiter: string;
  PEYMENT_METHOD: PAYMENT_METHOD;
  totalPrice: number;
  returned: number;
  paid: number;
  vats: Record<string, number>;
  noVatTotalPrice: number;
  date: string;
};

export type PAYMENT_METHOD = "CASH" | "CREDIT CARD";
