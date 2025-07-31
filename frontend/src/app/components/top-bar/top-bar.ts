import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StateService } from "../../services/state-service";
import { DataService } from "../../services/data-service";

@Component({
  selector: "app-top-bar",
  imports: [FormsModule, CommonModule],
  templateUrl: "./top-bar.html",
  styleUrl: "./top-bar.scss",
})
export class TopBar {
  constructor(
    public state: StateService,
    public data: DataService,
  ) {}

  waiterName = "";
  tableDescripbtion = "";

  showNameTaken = true;
}
