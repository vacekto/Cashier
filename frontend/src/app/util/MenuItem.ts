export interface MenuItem {
  name: string;
  price: number;
  type: "MEAL" | "DRINK";
  id: string;
  volume?: number;
  weight?: number;

  get describtion(): string;
}
