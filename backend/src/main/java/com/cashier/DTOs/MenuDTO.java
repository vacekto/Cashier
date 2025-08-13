package com.cashier.DTOs;

import java.util.List;

import com.cashier.data.Drink;
import com.cashier.data.Meal;

public record MenuDTO(List<Meal> meals, List<Drink> drinks) {

}
