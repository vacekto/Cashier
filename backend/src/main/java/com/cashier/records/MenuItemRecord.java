package com.cashier.records;

import com.cashier.data.MenuItem;

public record MenuItemRecord(
    String name,
    double price,
    MenuItem.Type type,
    int volume,
    String id) {

}
