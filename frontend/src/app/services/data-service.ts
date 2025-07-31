import { Injectable } from "@angular/core";
import { ENV } from "../../environments/environment";
import { MenuItem, TableDTO, Waiter } from "../util/types";
import { ToastService } from "./toast-service";

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
    const data = await this.fetchAPIResource<MenuItem[]>("/menu");
    if (data)
      data.forEach(
        (i) =>
          (i.describtion = `${i.name} ${i.volume} ${i.type === "DRINK" ? "ml" : "g"}`),
      );
    return data;
  }

  async getTables() {
    return this.fetchAPIResource<TableDTO[]>("/tables");
  }

  async getWaiters() {
    return this.fetchAPIResource<Waiter[]>("/waiters");
  }
}
