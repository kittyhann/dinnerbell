import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BookingPopupComponent } from '../../components/booking-form/booking-form.component';
import { BookedConfirmationComponent } from '../../components/booked-confirmation/booked-confirmation.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../models/user.model';

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
  bookingData: any = null;

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

  constructor(public userService: UserService) {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    const now = new Date();
    this.selectedDate = now.toISOString().split('T')[0];
    this.minDate = this.selectedDate;

    // Auto-set next available time and format it
    let hour = now.getHours();
    if (hour < 16) {
      hour = 16;
    } else if (hour >= 23) {
      hour = 23;
    } else if (now.getMinutes() > 0) {
      hour = Math.min(23, hour + 1);
    }

    const displayHour = hour > 12 ? hour - 12 : hour;
    const rawTime = `${displayHour.toString()}:00 PM`;
    this.selectedTime = this.formatTimeSlot(rawTime); // ALWAYS formatted string
  }

  ngOnInit() {
    this.calculateAvailability();
  }

  bookTable() {
    if (!this.selectedTime || !this.availableSeatsPerSlot[this.selectedTime]) {
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

  onBookingConfirmed(data: any) {
    this.bookingData = data;
    this.showBookingForm = false;
    this.showConfirmation = true;

    // Use formatted time consistently
    const formattedTime = this.selectedTime;

    const newBooking: Booking = {
      id: this.generateId(),
      status: 'Reserved',
      date: this.selectedDate,
      time: formattedTime,
      guests: this.guests
    };

    // 1. Add to user service
    this.userService.addBooking(newBooking);

    // 2. Save to localStorage (adminReservations)
    const stored = localStorage.getItem('adminReservations');
    const reservations = stored ? JSON.parse(stored) : [];
    reservations.push(newBooking);
    localStorage.setItem('adminReservations', JSON.stringify(reservations));

    // 3. Update seat count using formattedTime (not raw selectedTime)
    if (!this.availableSeatsPerSlot[formattedTime]) {
      this.availableSeatsPerSlot[formattedTime] = this.maxSeatsPerSlot;
    }

    this.availableSeatsPerSlot[formattedTime] -= this.guests;
    if (this.availableSeatsPerSlot[formattedTime] < 0) {
      this.availableSeatsPerSlot[formattedTime] = 0;
    }
  }

  calculateAvailability() {
    const stored = localStorage.getItem('adminReservations');
    let reservations = stored ? JSON.parse(stored) : [];

    // Update expired bookings
    reservations = reservations.map((booking: any) => this.updateBookingStatus(booking));

    // Save updated data back to storage
    localStorage.setItem('adminReservations', JSON.stringify(reservations));
    
    // Initialize all time slots to max seats
    this.availableSeatsPerSlot = {};
    this.timeSlots.forEach(slot => {
      this.availableSeatsPerSlot[slot] = this.maxSeatsPerSlot;
    });

    // Filter bookings for the selected date only
    const selectedDateBookings = reservations.filter(
      (r: any) => r.date === this.selectedDate && r.status === 'Reserved'
    );

    selectedDateBookings.forEach((booking: any) => {
      const normalizedTime = this.formatTimeSlot(booking.time);
      if (this.availableSeatsPerSlot[normalizedTime] !== undefined) {
        this.availableSeatsPerSlot[normalizedTime] -= booking.guests;
        if (this.availableSeatsPerSlot[normalizedTime] < 0) {
          this.availableSeatsPerSlot[normalizedTime] = 0;
        }
      } else {
        console.warn('Booking time not recognized in slots:', booking.time);
      }
    });

    // Fix selectedTime if no availability or undefined
    if (!this.selectedTime || this.availableSeatsPerSlot[this.selectedTime] === undefined || this.availableSeatsPerSlot[this.selectedTime] <= 0) {
      const firstAvailable = this.timeSlots.find(slot => this.availableSeatsPerSlot[slot] > 0);
      this.selectedTime = firstAvailable || this.timeSlots[0];
    }

    if (this.guests > (this.availableSeatsPerSlot[this.selectedTime] || 0)) {
      this.guests = 1;
    }

    console.log('Available seats:', this.availableSeatsPerSlot);
    console.log('Selected time:', this.selectedTime);
  }


  updateBookingStatus(booking: any) {
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
    if (!time12h) {
      console.warn('Invalid time input to convertTo24Hour:', time12h);
      return '00:00:00';
    }
    const [time, modifier] = time12h.split(' ');
    if (!time || !modifier) {
      console.warn('Malformed time string:', time12h);
      return '00:00:00';
    }
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    } 

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

  generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  formatTimeSlot(time: string): string {
    if (!time) return '';
    // Example input: '4:00 PM' or '04:00 PM' => output: '04:00 PM'
    const [timePart, meridian] = time.split(' ');
    if (!timePart || !meridian) return '';
    let [hour, minutes] = timePart.split(':');

    if (hour.length === 1) {
      hour = '0' + hour;
    }
    return `${hour}:${minutes} ${meridian}`;
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
