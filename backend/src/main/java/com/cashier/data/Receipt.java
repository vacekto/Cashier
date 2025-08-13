package com.cashier.data;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import com.cashier.DTOs.ItemDTO;
import com.cashier.DTOs.ReceiptDTO;

public class Receipt {

  public enum PEYMENT_METHOD {
    CASH, CREDIT_CARD
  }

  String tableDescribtion;
  List<OrderedItem> items;
  String waiter;
  Receipt.PEYMENT_METHOD paymentMethod;
  double totalPrice;
  double paid;
  double returned;
  HashMap<Double, Double> vats;
  double noVatTotalPrice;
  Instant date;

  public Receipt(ReceiptDTO receptDTO) {

    List<OrderedItem> items = new ArrayList<>();

    for (ItemDTO itemDTO : receptDTO.items()) {
      OrderedItem newOrderedItem = new OrderedItem(itemDTO.menuItemId(), itemDTO.count());
      items.add(newOrderedItem);
    }
    this.vats = new HashMap<>();
    this.tableDescribtion = receptDTO.tableDescribtion();
    this.paymentMethod = receptDTO.paymentMethod();
    this.totalPrice = receptDTO.totalPrice();
    this.paid = receptDTO.paidAmount();
    this.returned = receptDTO.paidAmount() - receptDTO.totalPrice();
    this.noVatTotalPrice = 0.0;
    this.waiter = receptDTO.waiter();
    this.date = Instant.now();

    for (OrderedItem item : items) {
      double noVAT = item.menuItem.price / (1 + item.menuItem.VAT / 100);
      double vatAmount = item.menuItem.price - noVAT;
      Double vatTotal = vats.get(item.menuItem.VAT);
      if (vatTotal == null)
        vatTotal = 0.0;
      Double updatedVatAmount = vatTotal + vatAmount * item.count;
      vats.put(item.menuItem.VAT, updatedVatAmount);
      this.noVatTotalPrice += noVAT * item.count;
    }

    this.items = items;
  }

}
