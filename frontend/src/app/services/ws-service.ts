import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ENV } from "../../environments/environment";
import { StateService } from "./state-service";
import { ToastService } from "./toast-service";
import { Table } from "../util/models/Table";
import { TableDTO } from "../util/types/APItypes";
import { Waiter } from "../util/types/apptypes";

export type SocketMessage =
  | {
      event: "NEW_TABLE";
      payload: TableDTO;
    }
  | {
      event: "NEW_WAITER";
      payload: Waiter;
    }
  | {
      event: "TABLE_UPDATE";
      payload: TableDTO;
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
        this.toast.addToast(
          "new table",
          `Table ${msg.payload.describtion} was created`,
          "INFO",
        );
        break;
      case "NEW_WAITER":
        this.state.addWaiter(msg.payload);
        this.toast.addToast(
          "new waiter",
          `Waiter ${msg.payload.name} was registered`,
          "INFO",
        );
        break;
      case "TABLE_UPDATE":
        const tableUpdate = new Table(msg.payload);
        this.state.updateSingleTable(tableUpdate);
        break;
      default:
        console.warn(`UNHANDLED WEB SOCKET EVENT FROM SERVER: ${event}`);
    }
  }

  public subscribeForServerEvents() {
    this.socket$.subscribe({
      next: (msg) => this.handleMsg(msg),
      error: (err) => {
        this.toast.addToast("WS error", "Web socket connection error", "ERROR");
        console.error("Socket error:", err);
      },
    });
  }

  public close() {
    this.socket$.complete();
  }
}
