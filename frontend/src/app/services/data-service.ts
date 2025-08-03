import { Injectable } from "@angular/core";
import { ENV } from "../../environments/environment";
import { Menu, NewOrderDTO, TableDTO, Waiter } from "../util/types";
import { ToastService } from "./toast-service";
import { MenuItem } from "../util/MenuItem";
import { Table } from "../util/Table";
import { Drink } from "../util/Drink";
import { Meal } from "../util/Meal";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(public toasts: ToastService) {}

  private async fetchAPIResource<T>(
    path: string,
    options?: RequestInit,
  ): Promise<T | null> {
    return fetch(ENV.apiUrl + path, options)
      .then((res) => res.json())
      .catch((err) => {
        this.toasts.addToast(
          "api  request",
          `Error during API resource request, path: ${path}, method: ${options?.method ?? "GET"}`,
          "ERROR",
        );
        console.error(
          `Error during API resource request\npath: ${path}\nmethod: ${options?.method ?? "GET"} \nerror:`,
          err,
        );
        return null;
      });
  }

  async createTable(tableDescription: String) {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ tableDescription }),
    };

    return this.fetchAPIResource<{}>("/table", options);
  }

  async registerWaiter(name: String) {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ name }),
    };

    return this.fetchAPIResource<{}>("/waiter", options);
  }

  async getMenu() {
    return await this.fetchAPIResource<Menu>("/menu");
  }

  async getTables() {
    return this.fetchAPIResource<TableDTO[]>("/tables");
  }

  async getWaiters() {
    return this.fetchAPIResource<Waiter[]>("/waiters");
  }

  async sendNewOrder(newOrder: NewOrderDTO) {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(newOrder),
    };

    return this.fetchAPIResource<{}>("/table/order", options);
  }

  async test() {
    return this.fetchAPIResource<any>("/test");
  }
}
