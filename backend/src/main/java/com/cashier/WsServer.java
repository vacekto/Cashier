package com.cashier;

import org.java_websocket.server.WebSocketServer;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import java.net.InetSocketAddress;

public class WsServer extends WebSocketServer {

  public WsServer(int port) {
    super(new InetSocketAddress(port));
    this.setReuseAddr(true);

  }

  @Override
  public void onOpen(WebSocket conn, ClientHandshake handshake) {
    System.out.println("New connection from " + conn.getRemoteSocketAddress());
  }

  @Override
  public void onClose(WebSocket conn, int code, String reason, boolean remote) {
    if (reason != null)
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

}
