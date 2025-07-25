import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { State } from '../shared/state';

@Component({
  selector: 'app-top-bar',
  imports: [FormsModule, CommonModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss'
})
export class TopBar {

  constructor(public state: State) { }

  waiterName = '';
  tableDescripbtion = ''


  showNameTaken = true;





}
