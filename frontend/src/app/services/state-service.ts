import { Injectable, signal } from "@angular/core";
import { Table } from "../util/models/Table";
import { MenuItem } from "../util/models/MenuItem";
import { PAYMENT_METHOD, Receipt, Waiter } from "../util/types/apptypes";

type ReceiptDate = Receipt & {
  date: Date;
};

@Injectable({ providedIn: "root" })
export class StateService {
  tables = signal<Table[]>([]);
  waiters = signal<Waiter[]>([]);
  menu = signal<MenuItem[]>([]);
  selectedWaiter = signal<Waiter | null>(null);
  selectedTable = signal<Table | null>(null);
  paymentMethod = signal<PAYMENT_METHOD | null>(null);
  receipt = signal<ReceiptDate | null>(null);

  setReceipt(receipt: Receipt) {
    const r: any = receipt;
    r.date = new Date(receipt.date);
    this.receipt.set(r);
  }

  selectWaiter(id: string) {
    const waiter = this.waiters().find((w) => w.id === id);
    if (!waiter) throw new Error("no waiter found");
    this.selectedWaiter.set(waiter);
  }

  selectTable(id: string) {
    let table = this.tables().find((t) => t.id === id) ?? null;
    this.selectedTable.set(table);
  }

  selectPaymentMethod(method: PAYMENT_METHOD) {
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
