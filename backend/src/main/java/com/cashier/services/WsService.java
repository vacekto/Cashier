package com.cashier.services;

import com.cashier.WsServer;
import com.cashier.data.Waiter;
import com.google.gson.Gson;
import org.java_websocket.WebSocket;

public class WsService {

  static enum Event {
    NEW_TABLE,
    NEW_WAITER,
    TABLE_UPDATE
  }

  record WsMessage(Event event, Object payload) {
  }

  private WsServer socketServer;
  private Gson gson;

  public WsService(WsServer wsServer, Gson gson) {
    this.gson = gson;
    this.socketServer = wsServer;
  }

  private void broadcastMessage(WsMessage msg) {
    String jsonMsg = gson.toJson(msg);

    for (WebSocket conn : socketServer.getConnections()) {
      if (conn.isOpen())
        conn.send(jsonMsg);
    }
  }

  public void newTable(com.cashier.data.Table table) {
    WsMessage msg = new WsMessage(Event.NEW_TABLE, table);
    this.broadcastMessage(msg);
  }

  public void tableUpdate(com.cashier.data.Table table) {
    WsMessage msg = new WsMessage(Event.TABLE_UPDATE, table);
    this.broadcastMessage(msg);
  }

  public void newWaiter(Waiter waiter) {
    WsMessage msg = new WsMessage(Event.NEW_WAITER, waiter);
    this.broadcastMessage(msg);
  }
}
