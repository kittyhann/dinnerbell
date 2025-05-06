import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { User, Booking } from '../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    phone: '',
    password: '',
    avatarUrl: 'assets/default-avatar.jpg',
    bookings: []
  };

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  loading = false;
  bookings: Array<Booking & { timeAgo: string }> = [];

  showCancelModal = false;
  cancelTargetId: string | null = null;

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  refreshBookingsDisplay() {
    this.bookings = this.user.bookings.map(b => ({
      ...b,
      timeAgo: this.getTimeAgo(b.date, b.time)
    }));
  }  

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      alert('Please sign in first to view your profile.');
      this.router.navigate(['/']);
      return;
    }
  
    const currentUser = this.userService.getUser();
    if (currentUser) {
      this.user = {
        ...this.user,
        ...currentUser,
        avatarUrl: currentUser.avatarUrl || 'assets/default-avatar.jpg',
        bookings: currentUser.bookings || []
      };
  
      // Update past bookings to Completed
      const now = new Date();
      this.user.bookings.forEach(b => {
        const bookingDate = new Date(`${b.date}T${b.time}:00`);
        if (bookingDate < now && b.status === 'Reserved') {
          b.status = 'Completed';
        }
      });
  
      this.userService.setUser(this.user); // Persist updated statuses
      this.refreshBookingsDisplay();
    }
  }
  

  getTimeAgo(date: string, time: string): string {
    // Handle 12-hour time formats like "2:30 PM"
    const fullDateTime = new Date(`${date} ${time}`);
    if (isNaN(fullDateTime.getTime())) return 'Invalid date';
  
    const now = new Date();
    const diffMs = now.getTime() - fullDateTime.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  triggerFileInput(input: HTMLInputElement) {
    input.click();
  }

  async saveChanges() {
    this.loading = true;
    try {
      if (this.selectedFile) {
        const uploadedUrl = await this.userService.uploadProfilePicture(this.selectedFile);
        this.user.avatarUrl = uploadedUrl;
      }
      this.userService.setUser(this.user);
      alert('Profile updated successfully!');
      this.selectedFile = null;
      this.previewUrl = null;
    } catch (err: any) {
      alert(err?.message || 'Something went wrong while saving changes.');
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  openCancelPopup(bookingId: string) {
    this.cancelTargetId = bookingId;
    this.showCancelModal = true;
  }

  closeCancelPopup() {
    this.cancelTargetId = null;
    this.showCancelModal = false;
  }

  confirmCancel() {
    if (this.cancelTargetId) {
      const booking = this.user.bookings.find(b => b.id === this.cancelTargetId);
      if (booking && booking.status === 'Reserved') {
        booking.status = 'Cancelled';
        this.userService.setUser(this.user);
      }
  
      this.refreshBookingsDisplay();
    }
    this.closeCancelPopup();
  }
  

  signOut() {
    this.userService.signOut();
    this.router.navigate(['/']);
  }
}
