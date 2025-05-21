import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { Router } from '@angular/router';


import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule here
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
  otp: string = '';             // Input field for OTP
  otpSent: boolean = false;     // Flag to toggle OTP section

  constructor(private userService: UserService, private router: Router) {}

  sendOtp() {
  if (!this.username || !this.email || !this.phone || !this.password) {
    alert('Please fill in all fields');
    return;
  }

  const pendingUser: User = {
    id: this.generateId(),
    name: this.username,
    email: this.email,
    phone: this.phone,
    password: this.password,
    avatarUrl: 'assets/default-avatar.jpg',
    bookings: [],
    joinedOn: new Date().toLocaleDateString()
  };

  this.userService.registerUser(pendingUser); // Fake registration
  this.otpSent = true;
  alert('OTP sent! (Fake it for now)');

  this.switchForm.emit('otp'); // ✅ Tell Navbar to show OTP modal
}



  switchToSignUp() {
    this.switchForm.emit('signup');
  }

  switchToSignIn() {
    this.switchForm.emit('signin');
  }
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
