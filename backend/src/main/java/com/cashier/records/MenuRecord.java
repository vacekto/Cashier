package com.cashier.records;

import java.util.List;

import com.cashier.data.Drink;
import com.cashier.data.Meal;

public record MenuRecord(List<Meal> meals, List<Drink> drinks) {

}
