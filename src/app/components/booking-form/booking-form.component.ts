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
    const timeToUse = this.selectedTime || '04:00 PM'; // fallback if no selected time

    // Always save time formatted as "HH:mm PM"
    // If timeToUse is like "5" or "05:00 PM", normalize it
    const formattedTime = this.formatTimeSlot(timeToUse);

    const newBooking = {
      name: this.fullName,
      number: this.mobileNumber,
      guests: this.guests,
      date: dateToUse,
      time: formattedTime
    };

    // Save to localStorage using the SAME key as HomeComponent expects
    try {
      const stored = localStorage.getItem('adminReservations');
      const existing = stored ? JSON.parse(stored) : [];

      if (Array.isArray(existing)) {
        existing.push(newBooking);
        localStorage.setItem('adminReservations', JSON.stringify(existing));
      } else {
        localStorage.setItem('adminReservations', JSON.stringify([newBooking]));
      }
    } catch (error) {
      console.error('Failed to save booking to localStorage:', error);
    }

    this.bookingConfirmed.emit(newBooking);
  } else {
    alert('Please fill in all fields.');
  }
}

// Add this helper method in BookingPopupComponent:
formatTimeSlot(time: string): string {
  if (!time) return '';
  const [timePart, meridian] = time.split(' ');
  if (!timePart || !meridian) return '';
  let [hour, minutes] = timePart.split(':');
  if (hour.length === 1) {
    hour = '0' + hour;
  }
  return `${hour}:${minutes} ${meridian}`;
}


}
