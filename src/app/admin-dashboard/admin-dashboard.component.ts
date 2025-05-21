import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserListComponent } from './user-list.component';
import { Booking } from '../models/user.model';

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
    bookings: Booking[];
  }[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadLocalBookings();
  }

  loadLocalBookings() {
    if (!isPlatformBrowser(this.platformId)) return;

    const raw = localStorage.getItem('booking');
    let bookings: Booking[] = [];

    try {
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          bookings = parsed.filter((b: Booking) => b.status !== 'Deleted');
        }
      }
    } catch (e) {
      console.error('Failed to parse bookings from localStorage:', e);
    }

    const grouped: {
      [key: string]: {
        date: string;
        time: string;
        bookings: Booking[];
      };
    } = {};

    bookings.forEach(booking => {
      if (!booking.date || !booking.time || !booking.name || !booking.guests) return;

      const hour = this.time12hTo24hHour(booking.time);
      const key = `${booking.date}_${hour}`;

      if (!grouped[key]) {
        grouped[key] = {
          date: booking.date,
          time: hour,
          bookings: []
        };
      }

      grouped[key].bookings.push({ ...booking, time: hour });
    });

    this.reservations = Object.values(grouped);
  }

  signOut() {
    if (confirm('Are you sure you want to log out?')) {
      this.userService.signOut();
    }
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  get filteredReservations() {
    const hours = ['16', '17', '18', '19', '20', '21', '22', '23'];
    const filtered = [];

    for (const hour of hours) {
      let slot = this.reservations.find(r => r.date === this.reservationDate && r.time === hour);
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

  releaseBooking(bookingToRemove: Booking, time: string) {
    if (!confirm(`Are you sure you want to release the booking for ${bookingToRemove.name}?`)) return;

    this.markBookingDeletedInStorage(bookingToRemove, time);
    this.loadLocalBookings();
  }

  private markBookingDeletedInStorage(bookingToRemove: Booking, time: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const raw = localStorage.getItem('booking');
    if (!raw) return;

    try {
      const bookings: Booking[] = JSON.parse(raw);
      const idx = bookings.findIndex(b =>
        b.name === bookingToRemove.name &&
        b.guests === bookingToRemove.guests &&
        b.date === this.reservationDate &&
        this.time12hTo24hHour(b.time) === time &&
        b.status !== 'Deleted'
      );
      if (idx !== -1) {
        bookings[idx].status = 'Deleted';
        localStorage.setItem('booking', JSON.stringify(bookings));
      }
    } catch (e) {
      console.error('Error marking booking as Deleted:', e);
    }
  }

  openReservationModal(time: string) {
    this.selectedTimeSlot = time;
    const slot = this.reservations.find(r => r.date === this.reservationDate && r.time === this.selectedTimeSlot);
    const takenSeats = slot ? this.getTotalSeats(slot) : 0;
    this.availableSeats = this.maxSeats - takenSeats;

    this.newBooking = { name: '', phone: '', email: '', seats: 1 };
    this.showReservationModal = true;
  }

  confirmReservation() {
    let slot = this.reservations.find(r => r.date === this.reservationDate && r.time === this.selectedTimeSlot);

    if (!slot) {
      slot = {
        date: this.reservationDate,
        time: this.selectedTimeSlot,
        bookings: []
      };
      this.reservations.push(slot);
    }

    const newSeats = Number(this.newBooking.seats);
    const totalSeats = this.getTotalSeats(slot);

    if (totalSeats + newSeats <= this.maxSeats) {
      const booking: Booking = {
        id: crypto.randomUUID?.() || Math.random().toString(36).substring(2),
        userId: '',
        email: this.newBooking.email,
        name: this.newBooking.name,
        date: this.reservationDate,
        time: this.hour24To12hFormat(this.selectedTimeSlot),
        guests: newSeats,
        status: 'Reserved'
      };

      slot.bookings.push(booking);
      this.saveToStorage();
      this.showReservationModal = false;
      this.showSuccessModal = true;
    } else {
      alert(`Cannot add ${newSeats} guests. Only ${this.maxSeats - totalSeats} seats remaining.`);
    }
  }

  saveToStorage() {
    if (!isPlatformBrowser(this.platformId)) return;

    const flat = this.reservations.flatMap(res =>
      res.bookings.map(b => ({
        ...b,
        time: this.hour24To12hFormat(res.time),
        date: res.date
      }))
    );

    localStorage.setItem('booking', JSON.stringify(flat));
  }

  closeReservationModal() {
    this.showReservationModal = false;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  getTotalSeats(slot: { bookings: Booking[] }): number {
    return this.getFilteredBookings(slot)
      .filter(booking => booking.status !== 'Cancelled')
      .reduce((total, booking) => total + booking.guests, 0);
  }

  time12hTo24hHour(time12h: string): string {
    if (!time12h) return '';

    const [time, meridian] = time12h.split(' ');
    if (!time || !meridian) return '';

    let [hours, minutes] = time.split(':').map(Number);
    if (meridian === 'PM' && hours < 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;

    return hours.toString();
  }

  hour24To12hFormat(hourStr: string): string {
    let hour = parseInt(hourStr, 10);
    let meridian = 'AM';
    if (hour >= 12) {
      meridian = 'PM';
      if (hour > 12) hour -= 12;
    }
    if (hour === 0) hour = 12;
    return `${hour.toString().padStart(2, '0')}:00 ${meridian}`;
  }

  getFilteredBookings(slot: { bookings: Booking[] }) {
    if (!this.reservationName) return slot.bookings;
    return slot.bookings.filter(b =>
      b.name.toLowerCase().includes(this.reservationName.toLowerCase())
    );
  }

  isPastSlot(slot: { date: string; time: string }): boolean {
    const dateStr = `${slot.date}T${slot.time.padStart(2, '0')}:00:00`;
    const slotDate = new Date(dateStr);
    return slotDate < new Date();
  }
}
