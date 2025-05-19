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

  currentDate: Date = new Date();

  get defaultTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const clampedHour = Math.min(23, Math.max(16, hours + 1));
  // Convert 24h hour to 12h hour (4-11)
  return (clampedHour - 12).toString();
}

submitBooking() {
  if (this.fullName && this.mobileNumber) {
    const dateToUse = this.selectedDate || this.currentDate.toISOString().split('T')[0];

    // Extract only hour number from selectedTime if available, otherwise use default
    let timeToUse = this.selectedTime || this.defaultTime;

    // If selectedTime is in "05:00 PM" format, parse it to just the hour number (e.g. "5")
    if (timeToUse.includes(':')) {
      const hourPart = timeToUse.split(':')[0];
      let hourNum = parseInt(hourPart, 10);
      // If PM and hour < 12, convert to 12-23 range
      if (timeToUse.toUpperCase().includes('PM') && hourNum < 12) {
        hourNum += 12;
      }
      timeToUse = (hourNum - 12).toString();  // Convert to 4-11 range string
    }

    const newBooking = {
      name: this.fullName,
      number: this.mobileNumber,
      guests: this.guests,
      date: dateToUse,
      time: timeToUse
    };

    // Save to localStorage
    try {
      const stored = localStorage.getItem('booking');
      const existing = stored ? JSON.parse(stored) : [];

      if (Array.isArray(existing)) {
        existing.push(newBooking);
        localStorage.setItem('booking', JSON.stringify(existing));
      } else {
        localStorage.setItem('booking', JSON.stringify([newBooking]));
      }
    } catch (error) {
      console.error('Failed to save booking to localStorage:', error);
    }

    this.bookingConfirmed.emit(newBooking);
  } else {
    alert('Please fill in all fields.');
  }
}

}
