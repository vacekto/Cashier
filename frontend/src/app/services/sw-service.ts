import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ENV } from "../../environments/environment";
import { StateService } from "./state-service";
import { ToastService } from "./toast-service";
import { TableDTO, Waiter } from "../util/types";
import { Table } from "../util/Table";

export type SocketMessage =
  | {
      event: "NEW_TABLE";
      payload: TableDTO;
    }
  | {
      event: "NEW_WAITER";
      payload: Waiter;
    };

@Injectable({
  providedIn: "root",
})
export class WsService {
  private socket$: WebSocketSubject<SocketMessage>;

  constructor(
    public state: StateService,
    public toast: ToastService,
  ) {
    this.socket$ = webSocket(ENV.wsUrl);
  }

  private handleMsg(msg: SocketMessage) {
    const event = msg.event;
    switch (msg.event) {
      case "NEW_TABLE":
        const newTable = new Table(msg.payload);
        this.state.addTable(newTable);
        break;
      case "NEW_WAITER":
        this.state.addWaiter(msg.payload);
        break;
      default:
        console.warn(`UNHANDLED WEB SOCKET EVENT FROM SERVER !!: ${event}`);
    }
  }

  public listenForMessages() {
    this.socket$.subscribe({
      next: (msg) => this.handleMsg(msg),
      error: (err) => {
        this.toast.addToast("WS error", "Web socket connection error", "ERROR");
        console.error("Socket error:", err);
      },
      complete: () => console.warn("Socket connection closed"),
    });
  }

  public close() {
    this.socket$.complete();
  }
}
