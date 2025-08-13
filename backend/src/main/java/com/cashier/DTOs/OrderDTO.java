package com.cashier.DTOs;

import java.util.List;

public record OrderDTO(
    List<ItemDTO> orderedItems, String tableId) {
}
