import { AfterViewInit, Component, OnInit } from "@angular/core";
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
import { Tooltip } from "bootstrap";
declare var bootstrap: any;

type Theme = "dark" | "light";

@Component({
  selector: "app-root",
  imports: [CommonModule, Toast, RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit, AfterViewInit {
  constructor(
    public state: StateService,
    public data: DataService,
    public ws: WsService,
  ) {}

  theme: Theme = "light";

  async ngOnInit() {
    this.ws.listenForMessages();

    await Promise.allSettled([
      this.fetchMenu(),
      this.fetchTables(),
      this.fetchWaiters(),
    ]);
  }

  ngAfterViewInit(): void {
    this.initializeTooltips();
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

  private initializeTooltips() {
    // const tooltipTriggerList = document.querySelectorAll(
    //   '[data-bs-toggle="tooltip"]',
    // );
    // [...tooltipTriggerList].forEach((el) => {
    //   new Tooltip(el);
    // });
    // const tooltipTriggerList = document.querySelectorAll(
    //   '[data-bs-toggle="tooltip"]',
    // );
    // const tooltipList = [...tooltipTriggerList].map(
    //   (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
    // );
  }
}
