package com.cashier.services;

import static spark.Spark.*;

import com.cashier.data.MenuItem;
import com.cashier.data.OrderedItem;
import com.cashier.data.Table;
import com.cashier.data.Waiter;
import com.cashier.records.MenuRecord;
import com.cashier.records.NewItemRecord;
import com.cashier.records.NewOrderRecord;
import com.cashier.records.NewTableRecord;
import com.cashier.records.NewWaiterRecord;
import com.google.gson.Gson;

public class HttpService {

  private Gson gson;
  WsService wsService;

  public HttpService(WsService wsService, Gson gson) {
    this.gson = gson;
    this.wsService = wsService;
  }

  public void registerRoutes() {

    get("/menu", (_, res) -> {
      res.type("application/json");
      MenuRecord menu = MenuItem.getMenu();
      System.out.println(menu);
      return menu;
    }, gson::toJson);

    get("/tables", (_, res) -> {
      res.type("application/json");
      return Table.getAllTables();
    }, gson::toJson);

    get("/waiters", (_, res) -> {
      res.type("application/json");
      return Waiter.getAllWaiters();
    }, gson::toJson);

    post("/waiter", (req, res) -> {
      res.type("application/json");
      NewWaiterRecord nwr = gson.fromJson(req.body(), NewWaiterRecord.class);
      Waiter newWaiter = new Waiter(nwr.name());
      this.wsService.newWaiter(newWaiter);
      return "{}";
    }, gson::toJson);

    post("/table", (req, res) -> {
      res.type("application/json");
      NewTableRecord ntr = gson.fromJson(req.body(), NewTableRecord.class);
      Table table = new Table(ntr.tableDescription());
      this.wsService.newTable(table);
      return "{}";
    }, gson::toJson);

    post("/table/order", (req, res) -> {
      res.type("application/json");

      NewOrderRecord nor = gson.fromJson(req.body(), NewOrderRecord.class);
      Table table = Table.getTableById(nor.tableId());
      for (NewItemRecord nir : nor.orderedItems()) {
        for (int i = 0; i < nir.count(); i++) {
          OrderedItem newOrderedItem = new OrderedItem(nir.menuItemId());
          table.addOrder(newOrderedItem);
        }

      }
      this.wsService.tableUpdate(table);

      return "{}";
    }, gson::toJson);

  }
}
