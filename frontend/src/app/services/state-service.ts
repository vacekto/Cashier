import { Injectable, signal } from "@angular/core";
import { Table } from "../util/Table";
import { MenuItem, Waiter } from "../util/types";

@Injectable({ providedIn: "root" })
export class StateService {
  tables = signal<Table[]>([]);
  waiters = signal<Waiter[]>([]);
  menu = signal<MenuItem[]>([]);
  selectedWaiterId = signal<string | null>(null);
  selectedTable = signal<Table | null>(null);
  paymentMethod = signal<"Credit card" | "Cash" | null>(null);

  focusWaiter(id: string) {
    this.selectedWaiterId.set(id);
  }

  selectTable(id: string) {
    let table = this.tables().find((t) => t.id === id) ?? null;

    this.selectedTable.set(table);
  }

  selectPaymentMethod(method: "Credit card" | "Cash") {
    this.paymentMethod.set(method);
  }

  addTable(newTable: Table) {
    this.tables.update((prev) => [...prev, newTable]);
    console.log(this.tables());
  }

  addWaiter(waiter: Waiter) {
    this.waiters.update((prev) => [...prev, waiter]);
  }

  updateMenu(menu: MenuItem[]) {
    this.menu.set(menu);
  }

  updateTables(tables: Table[]) {
    this.tables.set(tables);
  }

  updateWaiters(waiters: Waiter[]) {
    this.waiters.set(waiters);
  }
}
