package com.cashier.data;

public class OrderedItem {
  final MenuItem menuItem;
  int count;

  public OrderedItem(String menuItemId, int count) {
    this.menuItem = MenuItem.getItemById(menuItemId);
    this.count = count;
  }
}