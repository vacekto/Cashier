package com.cashier.data;

import java.time.Instant;

public class OrderedItem {
  final MenuItem menuItem;
  final Instant orderedAt;

  public OrderedItem(String menuItemId) {
    this.menuItem = MenuItem.getItemById(menuItemId);
    this.orderedAt = Instant.now();
  }
}