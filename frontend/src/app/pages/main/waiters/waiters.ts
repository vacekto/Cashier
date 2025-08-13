import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StateService } from "../../../services/state-service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-waiters",
  imports: [CommonModule],
  templateUrl: "./waiters.html",
  styleUrl: "./waiters.scss",
})
export class Waiters {
  constructor(public state: StateService) {}

  getInitials(name: string) {
    const split = name.split(" ").filter((s) => s !== "");
    console.log(split);
    return split.length == 1
      ? `${name[0].toUpperCase()}${name[1].toUpperCase()}`
      : `${split[0][0].toUpperCase()}${split[1][0].toUpperCase()}`;
  }
}
