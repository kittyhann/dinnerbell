import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BookingPopupComponent } from '../../components/booking-form/booking-form.component';
import { BookedConfirmationComponent } from '../../components/booked-confirmation/booked-confirmation.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
export class HomeComponent implements OnDestroy {
  showBookingForm = false;
  showConfirmation = false;
  bookingData: any = null;

  isLoggedIn = false;
  private userSubscription: Subscription;

  selectedDate: string = '';
  selectedTime: string = '';
  guests: number = 1;
  minDate: string = '';

  constructor(public userService: UserService) {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    const now = new Date();
    this.selectedDate = now.toISOString().split('T')[0];
    this.minDate = this.selectedDate;

    const hour = now.getHours();
    const roundedHour = Math.min(23, Math.max(16, Math.ceil(hour + 1)));
    const isPM = roundedHour >= 12;
    const displayHour = ((roundedHour + 11) % 12 + 1);
    this.selectedTime = `${displayHour.toString().padStart(2, '0')}:00 ${isPM ? 'PM' : 'AM'}`;
  }

  bookTable() {
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

    // ✅ Add booking with required `id`
    this.userService.addBooking({
      id: this.generateId(),
      status: 'Reserved',
      date: this.selectedDate,
      time: this.selectedTime,
      guests: this.guests
    });
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
