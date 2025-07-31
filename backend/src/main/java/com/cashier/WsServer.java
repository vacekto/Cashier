package com.cashier;

import org.java_websocket.server.WebSocketServer;
import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import java.net.InetSocketAddress;

public class WsServer extends WebSocketServer {
  private Gson gson;

  public static enum Event {
    NEW_TABLE
  }

  private static class Message {
    Event event;
    String payload;

    Message(Event event, String payload) {
      this.event = event;
      this.payload = payload;
    }
  }

  public WsServer(int port, Gson gson) {
    super(new InetSocketAddress(port));
    this.gson = gson;
    this.setReuseAddr(true);

  }

  @Override
  public void onOpen(WebSocket conn, ClientHandshake handshake) {
    System.out.println("New connection from " + conn.getRemoteSocketAddress());
  }

  @Override
  public void onClose(WebSocket conn, int code, String reason, boolean remote) {
    System.out.println("Closed: " + reason);
  }

  @Override
  public void onMessage(WebSocket conn, String message) {
    System.out.println("Message: " + message);
    conn.send("{\"event\":\"echo\", \"payload\":\"" + message + "\"}");
  }

  @Override
  public void onError(WebSocket conn, Exception ex) {
    ex.printStackTrace();
  }

  @Override
  public void onStart() {
    System.out.println("WebSocket server started");
  }

  public void broadcastMessage(Event event, String payload) {
    Message msg = new Message(event, payload);
    String jsonMsg = gson.toJson(msg);
    for (WebSocket conn : getConnections()) {
      if (conn.isOpen())
        conn.send(jsonMsg);
    }
  }
}
