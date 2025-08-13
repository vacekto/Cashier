package com.cashier.DTOs;

import java.util.List;
import com.cashier.data.Receipt;

public record ReceiptDTO(
    String tableId,
    String tableDescribtion,
    List<ItemDTO> items,
    String waiter,
    Receipt.PEYMENT_METHOD paymentMethod,
    double totalPrice,
    double paidAmount,
    String time) {
}
