import { Injectable, signal } from "@angular/core";
import { Table } from "../util/Table";
import { Waiter } from "../util/types";
import { MenuItem } from "../util/MenuItem";

@Injectable({ providedIn: "root" })
export class StateService {
  tables = signal<Table[]>([]);
  waiters = signal<Waiter[]>([]);
  menu = signal<MenuItem[]>([]);
  selectedWaiterId = signal<string | null>(null);
  selectedTable = signal<Table | null>(null);
  paymentMethod = signal<"Credit card" | "Cash" | null>(null);

  selectWaiter(id: string) {
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
  }

  addWaiter(waiter: Waiter) {
    this.waiters.update((prev) => [...prev, waiter]);
  }

  updateMenu(menu: MenuItem[]) {
    this.menu.set(menu);
  }

  updateAllTables(tables: Table[]) {
    this.tables.set(tables);
  }

  updateWaiters(waiters: Waiter[]) {
    this.waiters.set(waiters);
  }
  updateSingleTable(tableUpdate: Table) {
    let index = this.tables().findIndex((table) => table.id === tableUpdate.id);
    if (index === -1) return;

    this.tables.update((prev) => {
      prev[index] = tableUpdate;
      return [...prev];
    });

    if (this.selectedTable()?.id === tableUpdate.id)
      this.selectedTable.set(tableUpdate);
  }
}
