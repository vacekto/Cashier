/**
 * @property {string} volume - units in ml for DRINK type and g for MEAL.
 */
export type MenuItem = {
  name: string;
  price: number;
  type: "MEAL" | "DRINK";
  volume: number;
  id: string;
  describtion: string;
};

export type OrderedItem = MenuItem & {
  count: number;
  orderedAt: string;
};

export type TableDTO = {
  id: string;
  describtion: string;
  items: OrderedItem[];
};

export type Waiter = {
  name: string;
  id: string;
};
