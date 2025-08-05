import { MenuItem } from "../models/MenuItem";

export type OrderedItem = {
  menuItem: MenuItem;
  count: number;
};

export type Waiter = {
  name: string;
  id: string;
};

export type PaymentMethod = "CASH" | "CREDIT CARD";
