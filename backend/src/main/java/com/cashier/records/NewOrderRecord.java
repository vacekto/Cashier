package com.cashier.records;

import java.util.List;

public record NewOrderRecord(
    List<NewItemRecord> orderedItems, String tableId) {
}
