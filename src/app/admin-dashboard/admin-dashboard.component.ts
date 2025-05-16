import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserListComponent } from './user-list.component'; // adjust path as needed

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, UserListComponent],

  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  reservationDate: string = this.getCurrentDate();
  reservationTime: string = 'All';  // Default to "All" option for time
  reservationName: string = '';
  maxSeats: number = 20;
  availableSeats: number = 20;
  showUserList = false;


  // Pre-defined list of reservations
  reservations = [
    { date: '2025-05-15', time: '4', bookings: [{ name: 'Keith Casimir', seats: 4 }, { name: 'Daphne Yvon', seats: 4 }] },
    { date: '2025-05-15', time: '5', bookings: [{ name: 'Luna Delgado', seats: 2 }, { name: 'Daphne Yvon', seats: 2 }] },
    { date: '2025-05-16', time: '6', bookings: [{ name: 'Emil Santos', seats: 5 }] },
    { date: '2025-05-16', time: '7', bookings: [{ name: 'Zara Mercado', seats: 3 }] },
    { date: '2025-05-17', time: '8', bookings: [{ name: 'Nico Saldana', seats: 6 }] },
    { date: '2025-05-17', time: '9', bookings: [{ name: 'Emily Zhang', seats: 2 }] },
    { date: '2025-05-18', time: '10', bookings: [] },
    { date: '2025-05-18', time: '11', bookings: [{ name: 'Hiro Tanaka', seats: 4 }] }
  ];

  constructor(private userService: UserService, private router: Router) {}

  // Sign out method
  signOut() {
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
      this.userService.signOut();
    }
  }

  // Utility to get current date in YYYY-MM-DD format
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];  // Returns the date in the format 'YYYY-MM-DD'
  }


  get filteredReservations() {
  const hours = ['4', '5', '6', '7', '8', '9', '10', '11'];
  const filtered = [];

  for (const hour of hours) {
    // Try to find an existing reservation slot
    let slot = this.reservations.find(
      r => r.date === this.reservationDate && r.time === hour
    );

    // If it doesn't exist, create an empty one
    if (!slot) {
      slot = { date: this.reservationDate, time: hour, bookings: [] };
    }

    // Apply time and name filters
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


  // Get bookings for a given slot, filtered by name if necessary
  getFilteredBookings(slot: { bookings: { name: string; seats: number }[] }) {
    if (!this.reservationName) return slot.bookings;
    return slot.bookings.filter(b =>
      b.name.toLowerCase().includes(this.reservationName.toLowerCase())
    );
  }


releaseBooking(bookingToRemove: { name: string; seats: number }, time: string) {
  const confirmed = confirm(`Are you sure you want to release the booking for ${bookingToRemove.name}?`);
  
  if (confirmed) {
    const slot = this.reservations.find(
      r => r.date === this.reservationDate && r.time === time
    );

    if (slot) {
      slot.bookings = slot.bookings.filter(b => b !== bookingToRemove);
    }
  }
}


  // Popup state
showReservationModal = false;
showSuccessModal = false;
selectedTimeSlot: string = '';
newBooking: any = {
  name: '',
  phone: '',
  email: '',
  seats: 1
};

openReservationModal(time: string) {
  this.selectedTimeSlot = time;
  const slot = this.reservations.find(
    r => r.date === this.reservationDate && r.time === this.selectedTimeSlot
  );
  
  const takenSeats = slot ? this.getTotalSeats(slot) : 0;
  this.availableSeats = this.maxSeats - takenSeats;

  this.newBooking = {
    name: '',
    phone: '',
    email: '',
    seats: 1
  };
  this.showReservationModal = true;
}


// Close reservation form
closeReservationModal() {
  this.showReservationModal = false;
}

confirmReservation() {
  let slot = this.reservations.find(
    r => r.date === this.reservationDate && r.time === this.selectedTimeSlot
  );

  const newSeats = Number(this.newBooking.seats);  // Ensure numeric

  // 🔧 Create the slot if it doesn't exist
  if (!slot) {
    slot = {
      date: this.reservationDate,
      time: this.selectedTimeSlot,
      bookings: []
    };
    this.reservations.push(slot);  // 👈 Add the new slot to the array
  }

  const totalSeats = this.getTotalSeats(slot);

  if (totalSeats + newSeats <= this.maxSeats) {
    slot.bookings.push({
      name: this.newBooking.name,
      seats: newSeats
    });

    this.showReservationModal = false;
    this.showSuccessModal = true;
  } else {
    alert(`Cannot add ${newSeats} guests. Only ${this.maxSeats - totalSeats} seats remaining.`);
  }
}

// Ensure seats are counted correctly
getTotalSeats(slot: { bookings: { seats: number }[] }): number {
  return slot.bookings.reduce((sum, booking) => sum + Number(booking.seats), 0);
}


// Close success popup
closeSuccessModal() {
  this.showSuccessModal = false;
}
}
