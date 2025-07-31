package com.cashier;

import java.time.Instant;
import com.cashier.records.MenuItemRecord;

public class OrderedItem {
  private final MenuItemRecord item;
  private int count;
  private final Instant orderedAt;

  public OrderedItem(MenuItemRecord item, int count) {
    this.item = item;
    this.count = count;
    this.orderedAt = Instant.now();
  }

  public MenuItemRecord getItem() {
    return item;
  }

  public int getCount() {
    return count;
  }

  public Instant getOrderedAt() {
    return orderedAt;
  }
}