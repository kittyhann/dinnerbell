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

  // Get the current hour in 24h format
  let hour = now.getHours();

  // Clamp hour between 16 (4 PM) and 23 (11 PM)
  if (hour < 16) {
    hour = 16;
  } else if (hour >= 23) {
    hour = 23;
  } else {
    // Round up to next whole hour if not already exact
    if (now.getMinutes() > 0) {
      hour = Math.min(23, hour + 1);
    }
  }

  // Convert to 12-hour format without AM (all PM)
  const displayHour = hour > 12 ? hour - 12 : hour; // 13->1 PM, 16->4 PM etc.

  this.selectedTime = `${displayHour}`;
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
