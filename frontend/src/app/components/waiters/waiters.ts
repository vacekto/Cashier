import { Component } from '@angular/core';
import { StateService } from '../../services/state-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waiters',
  imports: [CommonModule],
  templateUrl: './waiters.html',
  styleUrl: './waiters.scss',
})
export class Waiters {
  constructor(public state: StateService) {}
}
