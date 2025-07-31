package com.cashier.services;

import com.cashier.WsServer;
import com.cashier.data.Table;
import com.cashier.data.Waiter;
import com.google.gson.Gson;
import org.java_websocket.WebSocket;

public class WsService {
  private static enum Event {
    NEW_TABLE,
    NEW_WAITER
  }

  private static record Message(Event event, Object payload) {
  }

  private WsServer socketServer;
  private Gson gson;

  public WsService(WsServer wsServer, Gson gson) {
    this.gson = gson;
    this.socketServer = wsServer;
  }

  private void broadcastMessage(Message msg) {
    String jsonMsg = gson.toJson(msg);

    for (WebSocket conn : socketServer.getConnections()) {
      if (conn.isOpen())
        conn.send(jsonMsg);
    }
  }

  public void newTableNotification(Table table) {
    Message msg = new Message(Event.NEW_TABLE, table);
    this.broadcastMessage(msg);
  }

  public void newWaiterNotification(Waiter waiter) {
    Message msg = new Message(Event.NEW_WAITER, waiter);
    this.broadcastMessage(msg);
  }
}
