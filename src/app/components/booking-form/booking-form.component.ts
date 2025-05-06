import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingPopupComponent {
  @Input() selectedDate: string = '';
  @Input() selectedTime: string = '';
  @Input() guests: number = 1;

  @Output() bookingConfirmed = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  fullName = '';
  mobileNumber = '';

  currentDate: Date = new Date(); // 👈 For fallback date

  // 👇 For fallback time display
  get defaultTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const roundedHour = Math.min(23, Math.max(16, Math.ceil(hours + 1)));
    const displayHour = ((roundedHour + 11) % 12 + 1);
    const ampm = roundedHour >= 12 ? 'PM' : 'AM';
    return `${displayHour.toString().padStart(2, '0')}:00 ${ampm}`;
  }

  submitBooking() {
    if (this.fullName && this.mobileNumber) {
      const dateToUse = this.selectedDate || this.currentDate.toISOString().split('T')[0];
      const timeToUse = this.selectedTime || this.defaultTime;

      this.bookingConfirmed.emit({
        name: this.fullName,
        number: this.mobileNumber,
        guests: this.guests,
        dateTime: `${dateToUse} ${timeToUse}`
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
