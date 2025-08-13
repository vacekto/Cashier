package com.cashier.services;

import static spark.Spark.*;
import com.cashier.DTOs.*;
import com.cashier.data.*;
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
      MenuDTO menu = MenuItem.getMenu();
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
      NewWaiterDTO newWaiterDTO = gson.fromJson(req.body(), NewWaiterDTO.class);
      Waiter newWaiter = new Waiter(newWaiterDTO.name());
      this.wsService.newWaiter(newWaiter);
      return "{}";
    }, gson::toJson);

    post("/table", (req, res) -> {
      res.type("application/json");
      NewTableDTO newTableDTO = gson.fromJson(req.body(), NewTableDTO.class);
      Table table = new Table(newTableDTO.tableDescription());
      this.wsService.newTable(table);
      return "{}";
    }, gson::toJson);

    post("/table/order", (req, res) -> {
      res.type("application/json");
      OrderDTO OrderDTO = gson.fromJson(req.body(), OrderDTO.class);
      Table table = Table.getTableById(OrderDTO.tableId());

      for (ItemDTO ItemDTO : OrderDTO.orderedItems()) {
        OrderedItem newOrderedItem = new OrderedItem(ItemDTO.menuItemId(), ItemDTO.count());
        table.addOrder(newOrderedItem);
      }

      this.wsService.tableUpdate(table);

      return "{}";
    }, gson::toJson);

    post("/table/receipt", (req, res) -> {
      res.type("application/json");
      ReceiptDTO receiptDTO = gson.fromJson(req.body(), ReceiptDTO.class);
      Receipt receipt = new Receipt(receiptDTO);
      Table table = Table.getTableById(receiptDTO.tableId());
      table.removeItems(receiptDTO.items());
      this.wsService.tableUpdate(table);
      return receipt;
    }, gson::toJson);

  }
}
