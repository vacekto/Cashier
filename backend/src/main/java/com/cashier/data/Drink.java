package com.cashier.data;

public class Drink extends MenuItem {
  private int volume;

  private Drink(String name, double price, Type type, int volume, double vat) {
    super(name, price, MenuItem.Type.DRINK, vat);
    this.volume = volume;
  }

}
