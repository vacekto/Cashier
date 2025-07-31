package com.cashier.data;

// volume in gram for MEAL and miligram for DRINK
public enum MenuItem {
  BURGER("Burger", 9.99, Type.MEAL, 150, 1),
  PIZZA("Pizza", 12.49, Type.MEAL, 120, 2),
  SALAD("Salad", 7.99, Type.MEAL, 70, 3),
  SODA("Soda", 1.99, Type.DRINK, 60, 4),
  PLZEN("Pivo", 1.90, Type.DRINK, 60, 5),
  POLICKA("Pivocosikdosi", 1.99, Type.DRINK, 80, 6);

  public static enum Type {
    MEAL, DRINK
  }

  private final String name;
  private final double price;
  private final Type type;
  private final int volume;
  private final int id;

  MenuItem(String name, double price, Type type, int volume, int id) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.volume = volume;
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public double getPrice() {
    return price;
  }

  public Type getType() {
    return type;
  }

  public int getVolume() {
    return volume;
  }

  public int getId() {
    return id;
  }

  public static class DTO {
    final String name;
    final double price;
    final MenuItem.Type type;
    final int volume;
    final int id;

    private DTO(MenuItem item) {
      this.name = item.getName();
      this.price = item.getPrice();
      this.type = item.getType();
      this.volume = item.getVolume();
      this.id = item.getId();
    }

    @Override
    public String toString() {
      return "MenuItemDTO{ name='" + name + "', price=" + price + ", type=" + type + " }";
    }
  }

  public static DTO createDto(MenuItem type) {
    return new MenuItem.DTO(type);
  }

}
