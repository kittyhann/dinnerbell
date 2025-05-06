import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, } from '../services/user.service';

@Component({
  selector: 'app-signup-otp',
  standalone: true,
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SignupOtpComponent {
  @Output() switchForm = new EventEmitter<'signin' | 'signup'>();
  @Output() close = new EventEmitter<void>();

  otp: string[] = ['', '', '', ''];
  resendTimer: string = '05:00'; // Default timer value
  private countdownInterval: any;

  constructor(private userService: UserService) {
    this.startResendTimer();
  }

  // Switch to sign-in form
  switchToSignIn() {
    this.switchForm.emit('signin');
  }

  // Submit OTP
  submitOtp() {
    const otpValue = this.otp.join('');

    // Notify user about successful OTP entry and signup
    alert('Signup successful! Please proceed to sign-in.');

    // Switch to the sign-in form after successful signup
    this.switchForm.emit('signin');
    
    // Close OTP modal
    this.close.emit();
  }

  // Triggered when user types in an OTP input box
  onOtpInput(index: number) {
    // Move focus to the next field if the current one is filled and not at the last input
    if (this.otp[index] && index < this.otp.length - 1) {
      const nextInput = document.getElementsByClassName('otp-input')[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }
  }

  // Focus the input when clicked on it
  onFocus(index: number) {
    const input = document.getElementsByClassName('otp-input')[index] as HTMLInputElement;
    input?.select();
  }

  // Ensure the focus stays on the correct field when user clicks
  onClick(index: number) {
    const input = document.getElementsByClassName('otp-input')[index] as HTMLInputElement;
    input?.focus();
  }

  // Start the resend OTP timer
  startResendTimer() {
    let timeLeft = 300; // 5 minutes in seconds

    this.countdownInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        this.resendTimer = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  // Format time to always display 2 digits (e.g., '05', '09')
  formatTime(time: number): string {
    return time < 10 ? '0' + time : time.toString();
  }
}
