import { MenuItem } from "./MenuItem";

export type MenuItemDTO = {
  name: string;
  price: number;
  type: "MEAL" | "DRINK";
  id: string;
  volume?: number;
  weight?: number;
};

export type Menu = {
  meals: MenuItemDTO[];
  drinks: MenuItemDTO[];
};

export type OrderedItem = {
  menuItem: MenuItem;
  count: number;
};

export type TableDTO = {
  id: string;
  describtion: string;
  items: {
    menuItem: MenuItemDTO;
    orderedAt: string;
  }[];
};

export type Waiter = {
  name: string;
  id: string;
};

export type NewOrderDTO = {
  tableId: string;
  orderedItems: NewItemDTO[];
};

export type NewItemDTO = {
  menuItemId: string;
  count: number;
};
