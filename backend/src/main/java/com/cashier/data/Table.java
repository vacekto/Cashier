package com.cashier.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.cashier.OrderedItem;

public class Table {
  private static final Map<String, Table> store = new HashMap<>();

  private final String id;

  private final String describtion;

  private List<OrderedItem> items;

  public Table(String describtion) {
    this.id = UUID.randomUUID().toString();
    this.describtion = describtion;
    this.items = new ArrayList<>();
    store.put(this.id, this);
  }

  public static List<Table> getAllTables() {
    return new ArrayList<>(store.values());
  }

}