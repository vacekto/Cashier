package com.cashier.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import com.cashier.DTOs.ItemDTO;

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

  public void removeItems(List<ItemDTO> items) {
    for (ItemDTO item : items) {
      Iterator<OrderedItem> iterator = this.items.iterator();

      while (iterator.hasNext()) {
        OrderedItem storedItem = iterator.next();

        if (storedItem.menuItem.id.equals(item.menuItemId())) {
          storedItem.count -= item.count();
        }
      }
    }
    this.items.removeIf(item -> {
      return item.count < 1;
    });

  }

  public void addOrder(OrderedItem item) {
    OrderedItem found = null;

    for (OrderedItem i : items) {
      if (i.menuItem.getId() == item.menuItem.getId()) {
        found = i;
        break;
      }
    }

    if (found == null) {
      this.items.add(item);
    } else {
      found.count = found.count + item.count;
    }
  }
}