import { Routes } from "@angular/router";
import { Main } from "./pages/main/main";
import { Payment } from "./pages/payment/payment";

export const routes: Routes = [
  { path: "", component: Main }, // for root
  { path: "payment", component: Payment },
  { path: "**", redirectTo: "" }, // wildcard
];
