import { Component } from '@angular/core';
import { State } from '../shared/state';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tables',
  imports: [CommonModule],
  templateUrl: './tables.html',
  styleUrl: './tables.scss'
})
export class Tables {

  constructor(public state: State) { }

}
