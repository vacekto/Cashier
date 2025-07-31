package com.cashier;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import static com.fatboyindustrial.gsonjavatime.Converters.registerAll;

import java.lang.reflect.Modifier;

import com.cashier.services.WsService;

import spark.Spark;

public class App {
  public static void main(String[] args) {
    Config.init();

    GsonBuilder builder = new GsonBuilder()
        .excludeFieldsWithModifiers(Modifier.TRANSIENT, Modifier.STATIC);
    registerAll(builder);
    Gson gson = builder.create();

    HTTPServer httpServer = new HTTPServer(Config.HTTP_PORT, gson);

    WsServer wsServer = new WsServer(Config.WS_PORT, gson);

    WsService wsService = new WsService(wsServer, gson);
    httpServer.injectWsService(wsService);

    httpServer.start();
    System.out.println("HTTP Server listening on port " + Config.HTTP_PORT);

    wsServer.start();
    System.out.println("Web socket Server listening on port " + Config.WS_PORT);

    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      Spark.stop();
      try {
        wsServer.stop();
      } catch (InterruptedException e) {
        System.out.println(e);
        e.printStackTrace();
      }
    }));
  }
}
