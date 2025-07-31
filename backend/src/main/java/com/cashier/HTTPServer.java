package com.cashier;

import static spark.Spark.*;
import spark.*;
import java.util.*;
import java.util.stream.Collectors;
import com.cashier.data.*;
import com.cashier.records.*;
import com.cashier.services.WsService;
import com.google.gson.Gson;

class HTTPServer {
  private static final HashMap<String, String> corsHeaders = new HashMap<String, String>();
  static {
    corsHeaders.put("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    corsHeaders.put("Access-Control-Allow-Origin", "*");
    corsHeaders.put("Access-Control-Allow-Headers",
        "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,");
    corsHeaders.put("Access-Control-Allow-Credentials", "true");
  }

  private WsService wsService;

  public void injectWsService(WsService wsService) {
    if (this.wsService == null)
      this.wsService = wsService;
  }

  private static void applyCors() {
    Filter filter = new Filter() {
      @Override
      public void handle(Request request, Response response) throws Exception {
        corsHeaders.forEach((key, value) -> {
          response.header(key, value);
        });
      }
    };

    Spark.after(filter);
  }

  private void applyExceptionHandler() {
    exception(Exception.class, (e, _, res) -> {
      res.type("application/json");
      res.status(500);
      corsHeaders.forEach(res::header);

      Map<String, String> error = new HashMap<>();
      error.put("error", e.getMessage());
      res.body(gson.toJson(error));

      e.printStackTrace();
    });
  }

  private Gson gson;

  HTTPServer(int port, Gson gson) {
    Spark.port(port);
    staticFileLocation("/public");
    applyCors();
    applyExceptionHandler();
    this.gson = gson;
  }

  void start() {
    this.registerRoutes();
  }

  private void registerRoutes() {
    get("/menu", (_, res) -> {
      res.type("application/json");
      List<Object> menuList = Arrays.stream(MenuItem.values())
          .map(item -> MenuItem.createDto(item))
          .collect(Collectors.toList());
      return menuList;
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
      this.wsService.newWaiterNotification(newWaiter);
      return "{}";
    }, gson::toJson);

    post("/table", (req, res) -> {
      res.type("application/json");
      NewTableRecord ntr = gson.fromJson(req.body(), NewTableRecord.class);
      System.out.println(ntr);
      Table table = new Table(ntr.tableDescription());
      this.wsService.newTableNotification(table);
      return "{}";
    }, gson::toJson);

    // get("/", (req, res) -> {
    // res.redirect("/index.html");
    // return "";
    // });
  }
}
