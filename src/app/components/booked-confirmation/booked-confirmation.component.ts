import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booked-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booked-confirmation.component.html',
  styleUrls: ['./booked-confirmation.component.css']
})
export class BookedConfirmationComponent {
  @Input() booking: any;
  @Output() close = new EventEmitter<void>();
}
