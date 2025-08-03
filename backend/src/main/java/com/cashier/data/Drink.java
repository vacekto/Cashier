package com.cashier.data;

public class Drink extends MenuItem {
  private int volume;

  private Drink(String name, double price, Type type, int volume) {
    super(name, price, MenuItem.Type.DRINK);
    this.volume = volume;
  }

}
