import { Component, Input, OnInit } from "@angular/core";
import { Receipt } from "../../util/types/apptypes";

type ReceiptDate = Receipt & {
  date: Date;
};

@Component({
  selector: "app-recepit-template",
  imports: [],
  templateUrl: "./recepit-template.html",
  styleUrl: "./recepit-template.scss",
})
export class RecepitTemplate implements OnInit {
  @Input() receipt!: ReceiptDate;

  ngOnInit(): void {}
}
