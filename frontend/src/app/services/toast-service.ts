// toast.service.ts
import { Injectable, signal } from "@angular/core";

export type UrgencyLevel = "INFO" | "ERROR" | "WARNING";
export type ToastData = {
  describtion: string;
  message: string;
  level: string;
  id: number;
};

@Injectable({ providedIn: "root" })
export class ToastService {
  private toastId = 1;
  private toastDuration = 3000;
  activeToasts = signal<ToastData[]>([]);

  addToast(describtion: string, message: string, level: UrgencyLevel) {
    const isSome = this.activeToasts().some(
      (t) => t.describtion === describtion,
    );
    if (isSome) return;

    let alertKind = "";

    switch (level) {
      case "ERROR": {
        alertKind = "alert-danger";
        break;
      }
      case "INFO": {
        alertKind = "alert-primary";
        break;
      }
      case "WARNING": {
        alertKind = "alert-warning";
        break;
      }
    }
    const toast: ToastData = {
      describtion,
      message,
      level: alertKind,
      id: this.toastId++,
    };
    this.activeToasts.update((prev) => [...prev, toast]);

    setTimeout(() => this.removeToast(describtion), this.toastDuration);
  }

  removeToast(describtion: string) {
    this.activeToasts.update((prev) =>
      prev.filter((t) => t.describtion !== describtion),
    );
  }
}
