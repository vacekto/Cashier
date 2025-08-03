import { Component, OnInit } from "@angular/core";
import { Waiters } from "./components/waiters/waiters";
import { Tables } from "./components/tables/tables";
import { TableDetails } from "./components/table-details/table-details";
import { TopBar } from "./components/top-bar/top-bar";
import { StateService } from "./services/state-service";
import { DataService } from "./services/data-service";
import { CommonModule } from "@angular/common";
import { Toast } from "./components/toast/toast";
import { WsService } from "./services/ws-service";
import { Table } from "./util/Table";
import { MenuItem } from "./util/MenuItem";
import { Drink } from "./util/Drink";
import { Meal } from "./util/Meal";

@Component({
  selector: "app-root",
  imports: [Waiters, Tables, TableDetails, TopBar, CommonModule, Toast],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  constructor(
    public state: StateService,
    public data: DataService,
    public ws: WsService,
  ) {}

  async ngOnInit() {
    this.ws.listenForMessages();

    await Promise.allSettled([
      this.fetchMenu(),
      this.fetchTables(),
      this.fetchWaiters(),
    ]);
  }

  private async fetchMenu() {
    const menuData = await this.data.getMenu();
    if (!menuData) return;

    const menu: MenuItem[] = [
      ...menuData.drinks.map((d) => new Drink(d)),
      ...menuData.meals.map((m) => new Meal(m)),
    ];

    if (menu) this.state.updateMenu(menu);
  }

  private async fetchTables() {
    const tableDtos = await this.data.getTables();
    if (!tableDtos) return;
    const tables = tableDtos?.map((dto) => new Table(dto));
    this.state.updateAllTables(tables);
  }

  private async fetchWaiters() {
    const waiters = await this.data.getWaiters();
    if (!waiters) return;
    this.state.updateWaiters(waiters);
  }
}
