import { Component } from "@angular/core";
import { StateService } from "../../services/state-service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-waiters",
  imports: [CommonModule],
  templateUrl: "./waiters.html",
  styleUrl: "./waiters.scss",
})
export class Waiters {
  constructor(public state: StateService) {}

  getInitials(name: string) {
    const split = name.split(" ");
    return split.length == 1
      ? `${name[0].toUpperCase()}${name[1].toUpperCase()}`
      : `${split[0][0].toUpperCase()}${split[1][0].toUpperCase()}`;
  }
}
