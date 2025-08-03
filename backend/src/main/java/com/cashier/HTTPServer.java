package com.cashier;

import static spark.Spark.*;
import spark.*;
import java.util.*;
import com.cashier.services.HttpService;
import com.google.gson.Gson;

class HTTPServer {
  private static final HashMap<String, String> corsHeaders = new HashMap<String, String>();

  private HttpService httpService;

  private static void applyCors() {
    options("/*", (request, response) -> {
      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }
      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }
      return "OK";
    });

    before((_, response) -> {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
      response.header("Access-Control-Allow-Credentials", "true");
    });
  }

  private Gson gson;

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

  HTTPServer(int port, Gson gson, HttpService httpService) {
    Spark.port(port);
    staticFileLocation("/public");
    applyCors();
    applyExceptionHandler();
    this.gson = gson;
    this.httpService = httpService;
  }

  void start() {
    this.httpService.registerRoutes();
  }

}
