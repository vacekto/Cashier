import { Component } from '@angular/core';
import { State } from '../shared/state';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './table-details.html',
  styleUrl: './table-details.scss'
})
export class TableDetails {
  constructor(public state: State) { }

  get selectedItems() {
    return this.state.selectedTable()?.items ?? [];
  }

  addItemModal = false

  selectedItem: any = null; // This will store the selected object
}
