import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { Modal } from "bootstrap";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StateService } from "../../../../services/state-service";
import { DataService } from "../../../../services/data-service";

@Component({
  selector: "app-create-waiter-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./create-waiter-modal.html",
})
export class CreateWaiterModal implements AfterViewInit {
  @Input() modalInstanceOrigin!: Modal;

  @ViewChild("newWaiterModal", { static: true })
  modalElement!: ElementRef<HTMLElement>;
  modalInstance!: Modal;

  waiterName = "";
  errorMsg = "";

  constructor(
    public state: StateService,
    public data: DataService,
  ) {}

  ngAfterViewInit() {
    this.modalInstance = Modal.getOrCreateInstance(
      this.modalElement.nativeElement,
    );
  }

  submit() {
    const waiterName = this.waiterName;
    if (waiterName.trim().length < 6) {
      this.errorMsg = "Waiter name needs to include at least 6 symbols";
      return;
    }

    if (this.state.waiters().some((w) => w.name === waiterName)) {
      this.errorMsg = `Waiter name "${waiterName}" is already taken`;
      return;
    }

    this.data.registerWaiter(this.waiterName);
    this.modalInstance.hide();

    this.errorMsg = "";
    this.waiterName = "";
  }
}
