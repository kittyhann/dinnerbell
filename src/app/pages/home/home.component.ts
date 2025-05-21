import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BookingPopupComponent } from '../../components/booking-form/booking-form.component';
import { BookedConfirmationComponent } from '../../components/booked-confirmation/booked-confirmation.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    BookingPopupComponent,
    BookedConfirmationComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  showBookingForm = false;
  showConfirmation = false;
  bookingData: Booking | null = null;

  isLoggedIn = false;
  private userSubscription: Subscription;

  selectedDate: string = '';
  selectedTime: string = '';
  guests: number = 1;
  minDate: string = '';

  timeSlots: string[] = [
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
    '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
  ];

  availableSeatsPerSlot: { [time: string]: number } = {};
  maxSeatsPerSlot = 20;

  constructor(public userService: UserService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    const now = new Date();
    this.selectedDate = now.toISOString().split('T')[0];
    this.minDate = this.selectedDate;

    let hour = now.getHours();
    if (hour < 16) {
      hour = 16;
    } else if (hour >= 23) {
      hour = 23;
    } else if (now.getMinutes() > 0) {
      hour = Math.min(23, hour + 1);
    }

    const displayHour = hour > 12 ? hour - 12 : hour;
    const meridian = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = displayHour < 10 ? '0' + displayHour : displayHour.toString();
    this.selectedTime = `${formattedHour}:00 ${meridian}`;
  }

  ngOnInit() {
    this.calculateAvailability();
  }

  bookTable() {
    if (!this.selectedTime || this.availableSeatsPerSlot[this.selectedTime] === undefined) {
      alert("Please select a valid time slot.");
      return;
    }

    if (this.availableSeatsPerSlot[this.selectedTime] <= 0) {
      alert("Sorry, no more seats available for this time. Table Full.");
      return;
    }

    if (this.isLoggedIn) {
      this.showBookingForm = true;
    } else {
      console.log("Not logged in, opening sign-in modal...");
      this.userService.openSignIn();
    }
  }

  onBookingConfirmed(data: Booking) {
    this.bookingData = data;
    this.showBookingForm = false;
    this.showConfirmation = true;

    const stored = localStorage.getItem('booking');
    const bookings = stored ? JSON.parse(stored) : [];
    bookings.push(data);
    localStorage.setItem('booking', JSON.stringify(bookings));

    this.calculateAvailability();
  }

  calculateAvailability() {
  let reservations: Booking[] = [];

  if (isPlatformBrowser(this.platformId)) {
    const stored = localStorage.getItem('booking');
    reservations = stored ? JSON.parse(stored) : [];

    // Update statuses
    reservations = reservations.map((booking: Booking) => this.updateBookingStatus(booking));

    // Save back updated bookings
    localStorage.setItem('booking', JSON.stringify(reservations));
  }

  this.availableSeatsPerSlot = {};
  this.timeSlots.forEach(slot => {
    this.availableSeatsPerSlot[slot] = this.maxSeatsPerSlot;
  });

  const selectedDateBookings = reservations.filter(
    (booking: Booking) => booking.date === this.selectedDate && booking.status === 'Reserved'
  );

  selectedDateBookings.forEach((booking: Booking) => {
    const normalizedTime = this.formatTimeSlot(booking.time);
    if (this.availableSeatsPerSlot.hasOwnProperty(normalizedTime)) {
      this.availableSeatsPerSlot[normalizedTime] -= Number(booking.guests) || 0;
      if (this.availableSeatsPerSlot[normalizedTime] < 0) {
        this.availableSeatsPerSlot[normalizedTime] = 0;
      }
    } else {
      console.warn('Unmatched booking time:', booking.time, '→ normalized as:', normalizedTime);
    }
  });

  if (
    !this.selectedTime ||
    !this.availableSeatsPerSlot.hasOwnProperty(this.selectedTime) ||
    this.availableSeatsPerSlot[this.selectedTime] <= 0
  ) {
    const firstAvailable = this.timeSlots.find(slot => this.availableSeatsPerSlot[slot] > 0);
    this.selectedTime = firstAvailable || this.timeSlots[0];
  }

  if (this.guests > (this.availableSeatsPerSlot[this.selectedTime] || 0)) {
    this.guests = 1;
  }
}
  updateBookingStatus(booking: any): any {
    if (!booking.time) {
      console.warn('Booking missing time:', booking);
      return booking;
    }

    const now = new Date();
    const bookingDateTime = new Date(`${booking.date}T${this.convertTo24Hour(booking.time)}`);
    if (booking.status === 'Reserved' && bookingDateTime < now) {
      return { ...booking, status: 'Completed' };
    }
    return booking;
  }

  convertTo24Hour(time12h: string): string {
    if (!time12h) return '00:00:00';
    const [time, modifier] = time12h.split(' ');
    if (!time || !modifier) return '00:00:00';
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  }

  getAvailableGuestOptions(): number[] {
    const availableSeats = this.availableSeatsPerSlot[this.selectedTime] ?? this.maxSeatsPerSlot;
    const options: number[] = [];
    const maxOptions = Math.min(availableSeats, this.maxSeatsPerSlot);
    for (let i = 1; i <= maxOptions; i++) {
      options.push(i);
    }
    return options;
  }

  formatTimeSlot(time: string): string {
    if (!time) return '';
    const [timePart, meridian] = time.trim().split(' ');
    if (!timePart || !meridian) return '';
    let [hour, minutes] = timePart.split(':');
    if (hour.length === 1) hour = '0' + hour;
    return `${hour}:${minutes} ${meridian}`;
  }

  /**
   * Returns true if the given time slot has already passed (only checks if selected date is today).
   */
  isPastSlot(time12h: string): boolean {
    const slotTime = new Date(`${this.selectedDate}T${this.convertTo24Hour(time12h)}`);
    const now = new Date();

    const isSameDate = this.selectedDate === now.toISOString().split('T')[0];
    return isSameDate && slotTime < now;
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
