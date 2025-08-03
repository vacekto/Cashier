package com.cashier.util;

import io.gsonfire.TypeSelector;
import com.cashier.data.MenuItem;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class MenuItemTypeSelector implements TypeSelector<MenuItem> {
  @Override
  public Class<? extends MenuItem> getClassForElement(JsonElement readElement) {
    JsonObject jsonObj = readElement.getAsJsonObject();
    String type = jsonObj.get("type").getAsString();
    return switch (type) {
      case "MEAL" -> com.cashier.data.Meal.class;
      case "DRINK" -> com.cashier.data.Drink.class;
      default -> MenuItem.class;
    };
  }
}