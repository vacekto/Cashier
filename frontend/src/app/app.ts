import { Component, OnInit } from "@angular/core";
import { StateService } from "./services/state-service";
import { DataService } from "./services/data-service";
import { CommonModule } from "@angular/common";
import { Toast } from "./components/toast/toast";
import { WsService } from "./services/ws-service";
import { Table } from "./util/models/Table";
import { MenuItem } from "./util/models/MenuItem";
import { Drink } from "./util/models/Drink";
import { Meal } from "./util/models/Meal";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [CommonModule, Toast, RouterOutlet],
  templateUrl: "./app.html",
})
export class App implements OnInit {
  constructor(
    public state: StateService,
    public data: DataService,
    public ws: WsService,
  ) {}

  async ngOnInit() {
    this.ws.subscribeForServerEvents();

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
    this.state.selectedTable.set(this.state.tables()[0]);
  }

  private async fetchWaiters() {
    const waiters = await this.data.getWaiters();
    if (!waiters) return;
    this.state.updateWaiters(waiters);
  }
}
