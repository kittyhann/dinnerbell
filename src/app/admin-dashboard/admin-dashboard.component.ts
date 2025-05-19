import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserListComponent } from './user-list.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, UserListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  reservationDate: string = this.getCurrentDate();
  reservationTime: string = 'All';
  reservationName: string = '';
  maxSeats: number = 20;
  availableSeats: number = 20;
  showUserList = false;
  showReservationModal = false;
  showSuccessModal = false;
  selectedTimeSlot: string = '';
  newBooking: any = { name: '', phone: '', email: '', seats: 1 };

  reservations: {
    date: string;
    time: string;
    bookings: { name: string; seats: number }[];
  }[] = [];
  

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
  this.loadLocalBookings();

  if (isPlatformBrowser(this.platformId)) {
    console.log(localStorage.getItem('booking'));
  }
}
  
loadLocalBookings() {
  if (isPlatformBrowser(this.platformId)) {
    const stored = localStorage.getItem('booking');
    if (stored) {
      try {
        const rawBookings = JSON.parse(stored);

        if (Array.isArray(rawBookings)) {
          const grouped: { [key: string]: { date: string; time: string; bookings: { name: string; seats: number }[] } } = {};

          rawBookings.forEach((booking: any) => {
            if (!booking.date || !booking.time || !booking.name || !booking.guests) return;

            // Convert booking.time like "06:00 PM" => hour string "6" or "11:00 PM" => "11"
            const timeString = booking.time; // e.g. "06:00 PM"

            // Parse hour number from time string
            const [timePart, ampm] = timeString.split(' ');  // ["06:00", "PM"]
            let [hourStr] = timePart.split(':');              // "06"
            let hourNum = parseInt(hourStr, 10);

            if (ampm === 'PM' && hourNum < 12) hourNum += 12;
            if (ampm === 'AM' && hourNum === 12) hourNum = 0;

            // If your admin only expects hours 4 to 11 PM, adjust hourNum if needed
            // Example: 6 PM => 6, 11 PM => 11
            // If you want to display in 12h format from 4PM to 11PM, just use hourNum.toString()
            const hour = hourNum.toString();

            const key = `${booking.date}_${hour}`;
            if (!grouped[key]) {
              grouped[key] = {
                date: booking.date,
                time: hour,
                bookings: []
              };
            }

            grouped[key].bookings.push({
              name: booking.name,
              seats: Number(booking.guests)
            });
          });

          this.reservations = Object.values(grouped);
          return;
        }
      } catch (e) {
        console.error('Failed to parse bookings from localStorage:', e);
      }
    }

    // fallback: check adminReservations if booking is empty
    const fallback = localStorage.getItem('adminReservations');
    if (fallback) {
      try {
        const parsedFallback = JSON.parse(fallback);
        if (Array.isArray(parsedFallback)) {
          this.reservations = parsedFallback;
          return;
        }
      } catch (e) {
        console.error('Failed to parse adminReservations:', e);
      }
    }
  }

  
}

  signOut() {
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
      this.userService.signOut();
    }
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  get filteredReservations() {
    const hours = ['4', '5', '6', '7', '8', '9', '10', '11'];
    const filtered = [];

    for (const hour of hours) {
      let slot = this.reservations.find(
        r => r.date === this.reservationDate && r.time === hour
      );
      if (!slot) {
        slot = { date: this.reservationDate, time: hour, bookings: [] };
      }

      const timeMatch = this.reservationTime === 'All' || this.reservationTime === hour;
      const nameMatch = !this.reservationName || slot.bookings.some(booking =>
        booking.name.toLowerCase().includes(this.reservationName.toLowerCase())
      );

      if (timeMatch && nameMatch) {
        filtered.push(slot);
      }
    }

    return filtered;
  }

  getFilteredBookings(slot: { time: string; bookings: { name: string; seats: number }[] })
   {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return slot.bookings; // fallback to original slot bookings
  }

  const bookingsFromStorage = JSON.parse(localStorage.getItem('booking') || '[]');

  return slot.bookings.filter(b => {
    // Find a matching booking in localStorage
    const match = bookingsFromStorage.find((stored: any) =>
      stored.name === b.name &&
      Number(stored.guests) === b.seats &&
      stored.date === this.reservationDate &&
      stored.time === slot.time // ✅ Make sure we're using slot.time here
    );

    // Skip if status is Deleted
    if (match?.status === 'Deleted') return false;

    // Optional search filter
    if (this.reservationName) {
      return b.name.toLowerCase().includes(this.reservationName.toLowerCase());
    }

    return true;
  });
}

releaseBooking(bookingToRemove: { name: string; seats: number }, time: string) {
  console.log('Release clicked for:', bookingToRemove, time);
  const confirmed = confirm(`Are you sure you want to release the booking for ${bookingToRemove.name}?`);
  if (!confirmed) return;

  const slot = this.reservations.find(
    r => r.date === this.reservationDate && r.time === time
  );

  if (slot) {
    // Do not remove from slot.bookings — just visually filter them
    this.saveReservationsToStorage();
  }

  try {
    const stored = localStorage.getItem('booking');
    if (stored) {
      let bookings = JSON.parse(stored);

      const index = bookings.findIndex((b: any) =>
        b.name === bookingToRemove.name &&
        Number(b.guests) === bookingToRemove.seats &&
        b.date === this.reservationDate &&
        b.time === time
      );

      if (index !== -1) {
        bookings[index].status = 'Deleted'; // Mark as deleted
        localStorage.setItem('booking', JSON.stringify(bookings));
        console.log('Booking marked as Deleted in localStorage.');
      }
    }
  } catch (error) {
    console.error('Error marking booking as Deleted:', error);
  }
}



  openReservationModal(time: string) {
    this.selectedTimeSlot = time;
    const slot = this.reservations.find(
      r => r.date === this.reservationDate && r.time === this.selectedTimeSlot
    );
    const takenSeats = slot ? this.getTotalSeats(slot) : 0;
    this.availableSeats = this.maxSeats - takenSeats;

    this.newBooking = { name: '', phone: '', email: '', seats: 1 };
    this.showReservationModal = true;
  }

  saveReservationsToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('adminReservations', JSON.stringify(this.reservations));
    }
  }

  closeReservationModal() {
    this.showReservationModal = false;
  }

  confirmReservation() {
    let slot = this.reservations.find(
      r => r.date === this.reservationDate && r.time === this.selectedTimeSlot
    );

    const newSeats = Number(this.newBooking.seats);
    if (!slot) {
      slot = {
        date: this.reservationDate,
        time: this.selectedTimeSlot,
        bookings: []
      };
      this.reservations.push(slot);
    }

    const totalSeats = this.getTotalSeats(slot);
    if (totalSeats + newSeats <= this.maxSeats) {
      slot.bookings.push({
        name: this.newBooking.name,
        seats: newSeats
      });

      this.saveReservationsToStorage();
      this.showReservationModal = false;
      this.showSuccessModal = true;
    } else {
      alert(`Cannot add ${newSeats} guests. Only ${this.maxSeats - totalSeats} seats remaining.`);
    }
  }

 getTotalSeats(slot: { bookings: { name: string; seats: number }[]; time: string }): number {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return slot.bookings.reduce((sum, b) => sum + b.seats, 0); // fallback: assume all are valid
  }
  const bookingsFromStorage = JSON.parse(localStorage.getItem('booking') || '[]');

  let total = 0;

  for (const b of slot.bookings) {
    const match = bookingsFromStorage.find((stored: any) =>
      stored.name === b.name &&
      Number(stored.guests) === b.seats &&
      stored.date === this.reservationDate &&
      stored.time === slot.time
    );

    if (match?.status === 'Deleted') continue;  // skip deleted bookings

    total += b.seats;
  }

  return total;
}


  closeSuccessModal() {
    this.showSuccessModal = false;
  }
}
