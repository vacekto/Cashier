import { Component } from '@angular/core';
import { Waiters } from './waiters/waiters';
import { Tables } from './tables/tables';
import { TableDetails } from './table-details/table-details';
import { TopBar } from './top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [Waiters, Tables, TableDetails, TopBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {



}
