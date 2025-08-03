package com.cashier.data;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import com.cashier.records.MenuRecord;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import java.io.IOException;

public abstract class MenuItem {
  private static HashMap<String, MenuItem> store = new HashMap<String, MenuItem>();
  private static Gson gson;

  public static void injectGson(Gson gson) {
    if (MenuItem.gson == null) {
      MenuItem.gson = gson;
    }
  }

  public static MenuItem getItemById(String id) {
    return MenuItem.store.get(id);
  }

  public static MenuRecord getMenu() {
    List<Meal> meals = new ArrayList<Meal>();
    List<Drink> drinks = new ArrayList<Drink>();

    for (MenuItem item : MenuItem.store.values()) {
      if (item instanceof Drink)
        drinks.add((Drink) item);
      if (item instanceof Meal)
        meals.add((Meal) item);
    }
    return new MenuRecord(meals, drinks);
  }

  public static void loadMenuItems() {
    try (JsonReader reader = new JsonReader(new FileReader("menu.json"))) {
      java.lang.reflect.Type listType = new TypeToken<List<MenuItem>>() {
      }.getType();

      List<MenuItem> items = gson.fromJson(reader, listType);

      for (MenuItem item : items) {
        String id = UUID.randomUUID().toString();
        item.id = id;
        MenuItem.store.put(id, item);
      }

    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  protected enum Type {
    MEAL, DRINK
  }

  private final String name;
  private final double price;
  private final Type type;
  private String id;

  protected MenuItem(String name, double price, Type type) {
    String id = UUID.randomUUID().toString();
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
  }

  @Override
  public String toString() {
    return "MenuItemDTO{ name='" + name + "'}";
  }

}
