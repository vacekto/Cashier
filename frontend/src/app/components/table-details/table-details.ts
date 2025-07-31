import { Component, computed } from '@angular/core';
import { StateService } from '../../services/state-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddItemModal } from '../modals/add-item-modal/add-item-modal';

@Component({
  selector: 'app-table-details',
  imports: [FormsModule, CommonModule, AddItemModal],
  templateUrl: './table-details.html',
  styleUrl: './table-details.scss',
})
export class TableDetails {
  constructor(public state: StateService) {
    state.tables();
    state.selectedTable();
  }

  get selectedTableId(): string | null {
    return this.state.selectedTable()?.id ?? null;
  }

  set selectedTableId(id: string | null) {
    if (id !== null && id !== this.state.selectedTable()?.id) {
      this.state.selectTable(id);
    }
  }
  get selectedItems() {
    return this.state.selectedTable()?.items ?? [];
  }

  addItemModal = false;

  selectedItem: any = null;
}
