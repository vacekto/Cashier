package com.cashier;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializer;
import io.gsonfire.GsonFireBuilder;
import java.time.Instant;

import com.cashier.data.MenuItem;
import com.cashier.services.HttpService;
import com.cashier.services.WsService;
import com.cashier.util.MenuItemTypeSelector;
import spark.Spark;

public class App {
  public static void main(String[] args) {
    Config.init();

    GsonFireBuilder fireBuilder = new GsonFireBuilder();
    fireBuilder.registerTypeSelector(MenuItem.class, new MenuItemTypeSelector());

    GsonBuilder gsonBuilder = fireBuilder.createGsonBuilder()
        .registerTypeAdapter(Instant.class,
            (JsonSerializer<Instant>) (src, _, _) -> new JsonPrimitive(src.toString()))
        .registerTypeAdapter(Instant.class,
            (JsonDeserializer<Instant>) (json, _, _) -> Instant.parse(json.getAsString()));

    Gson gson = gsonBuilder.create();

    MenuItem.injectGson(gson);
    MenuItem.loadMenuItems();

    WsServer wsServer = new WsServer(Config.WS_PORT);
    WsService wsService = new WsService(wsServer, gson);
    HttpService httpService = new HttpService(wsService, gson);
    HTTPServer httpServer = new HTTPServer(Config.HTTP_PORT, gson, httpService);

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
