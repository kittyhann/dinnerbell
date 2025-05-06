import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
// src/app/components/signup/signup.component.ts
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'; // Correct import from the model


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchForm = new EventEmitter<'signin' | 'signup' | 'otp'>();

  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  sendOtp() {
    if (!this.username || !this.email || !this.phone || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    const pendingUser: User = {
      name: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password, // Keep this as it is
      avatarUrl: 'assets/default-avatar.jpg', // Add a default avatarUrl
      bookings: [] // Add an empty array for bookings
    };

    this.userService.registerUser(pendingUser); // Register the user but not log in yet

    alert('OTP sent successfully! (Simulated)');

    // Move user to OTP screen (but not logged in yet)
    this.switchForm.emit('otp');
  }

  switchToSignUp() {
    this.switchForm.emit('signup');
  }

  switchToSignIn() {
    this.switchForm.emit('signin');
  }
}
