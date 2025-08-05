package com.cashier.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class Table {
  private static final Map<String, Table> store = new HashMap<>();

  public static Table getTableById(String id) {
    return Table.store.get(id);
  }

  public static List<Table> getAllTables() {
    return new ArrayList<>(store.values());
  }

  final String id;
  final String describtion;
  private List<OrderedItem> items;

  public Table(String describtion) {
    this.id = UUID.randomUUID().toString();
    this.describtion = describtion;
    this.items = new ArrayList<>();
    store.put(this.id, this);
  }

  public void addOrder(OrderedItem item) {
    this.items.add(item);
  }

}