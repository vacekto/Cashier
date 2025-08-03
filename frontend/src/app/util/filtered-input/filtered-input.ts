import { Component, Input, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

type TItem = { name: string; id: number };

@Component({
  selector: "app-filtered-input",
  imports: [CommonModule, FormsModule],
  templateUrl: "./filtered-input.html",
})
export class FilteredInput {
  @Input() options: string[] = [];
  @Input() cb: (itemIndex: number) => void = () => {};

  private IdCounter = 1;
  items: TItem[] = [];
  searchText = "";
  filteredItems: TItem[] = [];
  selectedItem: TItem | null = null;
  extend = false;
  activeIndex: number = -1;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["options"]) {
      this.items = this.options.map((o) => ({ name: o, id: this.IdCounter++ }));
      this.activeIndex = -1;
      this.filterItems();
    }
  }

  filterItems() {
    const query = this.searchText.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(query),
    );
  }

  handleChange() {
    this.extend = true;
    this.filterItems();
  }

  selectItem(item: TItem | null) {
    this.selectedItem = item;
    this.searchText = item?.name.trim() ?? "";
    this.extend = false;
  }

  mouseEnter(i: number) {
    this.activeIndex = i;
  }

  mouseLeave(i: number) {
    this.activeIndex = -1;
  }

  onFocus() {
    this.extend = true;
    this.filterItems();
    this.activeIndex = -1;
  }

  hideDropdown() {
    this.extend = false;
  }

  handleSubmit() {
    const selectedItem = this.filteredItems[this.activeIndex];
    const selectedIndex = this.items.findIndex((i) => i.id === selectedItem.id);
    this.cb(selectedIndex);
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.filteredItems.length) return;

    switch (event.key) {
      case "ArrowDown":
        this.activeIndex = (this.activeIndex + 1) % this.filteredItems.length;
        this.filterItems();
        break;

      case "ArrowUp":
        this.activeIndex =
          (this.activeIndex - 1 + this.filteredItems.length) %
          this.filteredItems.length;
        this.filterItems();
        break;

      case "Enter":
        if (this.extend) this.selectItem(this.filteredItems[this.activeIndex]);
        else this.handleSubmit();
        break;
    }
  }
}
