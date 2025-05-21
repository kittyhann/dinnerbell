import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
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

    constructor(private userService: UserService) {}

  get defaultTime(): string {
    const now = new Date();
    let hour = now.getHours() + 1;
    if (hour < 16) hour = 16;
    if (hour > 23) hour = 23;

    const meridian = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour.toString().padStart(2, '0')}:00 ${meridian}`;
  }

  submitBooking() {
    if (this.fullName && this.mobileNumber) {
      const dateToUse = this.selectedDate || this.currentDate.toISOString().split('T')[0];
      const timeToUse = this.selectedTime || '04:00 PM';
      const formattedTime = this.formatTimeSlot(timeToUse);
      const user = this.userService.getCurrentUserFromList();
      const userId = user?.id;

      const newBooking = {
        id: this.generateId(),
        userId: userId,
        name: this.fullName,
        date: dateToUse,
        time: formattedTime,
        guests: this.guests,
        status: 'Reserved' as const
      };

      this.bookingConfirmed.emit(newBooking);
    } else {
      alert('Please fill in all fields.');
    }
  }

  formatTimeSlot(time: string): string {
    if (!time) return '';
    const [timePart, meridian] = time.trim().split(' ');
    if (!timePart || !meridian) return '';
    let [hour, minutes] = timePart.split(':');
    if (hour.length === 1) hour = '0' + hour;
    return `${hour}:${minutes} ${meridian}`;
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
