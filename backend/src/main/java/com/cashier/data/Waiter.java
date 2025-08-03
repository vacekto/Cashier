package com.cashier.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class Waiter {
  private final String id;

  private final String name;

  private static final Map<String, Waiter> store = new HashMap<>();

  public Waiter(String name) {
    this.name = name;
    this.id = UUID.randomUUID().toString();
    store.put(this.id, this);
  }

  public static List<Waiter> getAllWaiters() {
    return new ArrayList<>(store.values());
  }
}
