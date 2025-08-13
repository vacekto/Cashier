package com.cashier;

import io.github.cdimascio.dotenv.Dotenv;

class Config {
  public static int HTTP_PORT;
  public static int WS_PORT;

  static void init() {
    Dotenv dotenv = Dotenv.load();
    HTTP_PORT = Integer.parseInt(dotenv.get("HTTP_PORT"));
    WS_PORT = Integer.parseInt(dotenv.get("WS_PORT"));
  }
}
