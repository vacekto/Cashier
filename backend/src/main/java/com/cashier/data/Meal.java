package com.cashier.data;

public class Meal extends MenuItem {
  private int weight;

  private Meal(String name, double price, Type type, int weight) {
    super(name, price, MenuItem.Type.MEAL);
    this.weight = weight;
  }
}
