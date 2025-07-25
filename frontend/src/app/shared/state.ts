import { Injectable, signal } from '@angular/core';

export type TItem = {
  name: string,
  price: number,
  type: "MEAL" | "DRINK",
  volume?: number,
}

type TTable = {
  id: string
  describtion: string
  price: number
  items: TItem[]
}

type TWaiter = {
  name: string,
  id: string,
}

const defaultWaiters: TWaiter[] = [
  {
    id: "1",
    name: "John Doe"
  },
  {
    id: "2",
    name: "SomeoneElse"
  }
];

type TPaymentMenthod = "Credit card" | "Cash"

const defaultTables: TTable[] = [
  { describtion: "table 1", id: "1", price: 2.99, items: [] },
  { describtion: "table 2", id: "2", price: 2.99, items: [] },
  { describtion: "table 3", id: "3", price: 2.99, items: [] },
  { describtion: "table 4", id: "4", price: 2.99, items: [] },
  { describtion: "table 5", id: "5", price: 2.99, items: [] },
]

const menu: TItem[] = [
  {
    name: "water",
    price: 2,
    type: 'DRINK',
  },
  {
    name: "chicken",
    price: 4,
    type: 'MEAL',
  }
]

@Injectable({
  providedIn: 'root'
})
export class State {
  tables = signal(defaultTables);
  waiters = signal(defaultWaiters);
  selectedWaiterId = signal<string | null>(null);
  selectedTable = signal<TTable | null>(null);
  paymentMethod = signal<"Credit card" | "Cash" | null>(null);
  menu = signal(menu);

  focusWaiter(id: string) {
    this.selectedWaiterId.set(id);
  }

  focusTable(id: string) {
    let table = this.tables().find(t => t.id === id) ?? null
    this.selectedTable.set(table);
  }

  selectPaymentMethod(method: "Credit card" | "Cash") {
    this.paymentMethod.set(method);
  }

  addTable(describtion: string) {
    this.tables().push({
      id: Math.random().toString(),
      items: [],
      describtion,
      price: 0
    })

  }
  addWaiter(name: string) {
    this.waiters().push({
      id: Math.random().toString(),
      name,
    })
  }

  addItem(item: TItem) {
    const currentTable = this.selectedTable();
    if (!currentTable) return;

    const updatedTable = {
      ...currentTable,
      items: [...currentTable.items, item],
    };

    this.selectedTable.set(updatedTable);
  }
}
