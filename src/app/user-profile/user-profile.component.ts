import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
    id: '',
    name: '',
    email: '',
    phone: '',
    avatarUrl: 'assets/default-avatar.jpg',
    bookings: [],
    role: 'user',
    joinedOn: '',
    status: 'Active'
  };

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  loading = false;
  bookings: Array<Booking & { timeAgo: string }> = [];

  showCancelModal = false;
  cancelTargetId: string | null = null;
  viewerIsAdmin: boolean = false;


  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get isAdmin(): boolean {
    return this.user.role === 'admin';
  }

  ngOnInit(): void {
  const emailFromRoute = this.route.snapshot.paramMap.get('email');

  if (emailFromRoute) {
    // Admin is viewing someone else's profile
    this.viewerIsAdmin = true;

    const allUsers = this.userService.getAllUsers();
    const foundUser = allUsers.find(u => u.email === emailFromRoute);

    if (!foundUser) {
      if (isPlatformBrowser(this.platformId)) {
        alert('User not found');
      }
      this.router.navigate(['/admin-dashboard/user-list']);
      return;
    }

    this.user = {
      ...this.user,
      ...foundUser,
      avatarUrl: foundUser.avatarUrl || 'assets/default-avatar.jpg',
      bookings: foundUser.bookings || [],
      joinedOn: foundUser.joinedOn || new Date().toISOString().split('T')[0],
      status: foundUser.status || 'Active',
      role: foundUser.role || 'user'
    };

    // ✅ Sync status from localStorage if available
    const bookingStorage = JSON.parse(localStorage.getItem('Cancelledbookings') || '{}');
    const storedStatus = bookingStorage[emailFromRoute]?.status;
    if (storedStatus) {
      this.user.status = storedStatus;
    }

    this.refreshBookingsDisplay();

  } else {
    // User is viewing their own profile
    if (!this.userService.isLoggedIn()) {
      if (isPlatformBrowser(this.platformId)) {
        alert('Please sign in first to view your profile.');
      }
      this.router.navigate(['/']);
      return;
    }

    const currentUser = this.userService.getUser();
    if (currentUser) {
      this.user = {
        ...this.user,
        ...currentUser,
        avatarUrl: currentUser.avatarUrl || 'assets/default-avatar.jpg',
        bookings: currentUser.bookings || [],
        joinedOn: currentUser.joinedOn || new Date().toISOString().split('T')[0],
        status: currentUser.status || 'Active',
        role: currentUser.role || 'user'
      };

      // ✅ Sync status from localStorage if available
      const bookingStorage = JSON.parse(localStorage.getItem('booking') || '{}');
      const storedStatus = bookingStorage[this.user.email]?.status;
      if (storedStatus) {
        this.user.status = storedStatus;
      }

      this.viewerIsAdmin = currentUser.role === 'admin';
      this.userService.setUser(this.user);
      this.refreshBookingsDisplay();
    }
  }
}


refreshBookingsDisplay(): void {
  const userId = this.user.id;
  if (!userId) return;

  const storedBookingStr = localStorage.getItem('booking');
  if (!storedBookingStr) return;

  let allBookings: Booking[] = [];

  try {
    allBookings = JSON.parse(storedBookingStr);
  } catch (e) {
    console.error('Failed to parse booking data:', e);
    return;
  }

  console.log('Viewing profile for user ID:', userId);
  console.log('All bookings:', allBookings);

  this.bookings = allBookings
    .filter(b => b.userId === userId)
    .map(b => ({
      ...b,
      timeAgo: this.getTimeAgo(b.date, b.time)
    }));

  console.log('Filtered bookings:', this.bookings);
}





  markAsDeleted(): void {
    this.user.status = 'Deleted';
    this.userService.setUser(this.user);
  }

  markAsActive(): void {
    this.user.status = 'Active';
    this.userService.setUser(this.user);
  }

  getTimeAgo(date: string, time: string): string {
    const fullDateTime = new Date(`${date} ${time}`);
    if (isNaN(fullDateTime.getTime())) return 'Invalid date';

    const now = new Date();
    const diffMs = now.getTime() - fullDateTime.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  triggerFileInput(input: HTMLInputElement): void {
    input.click();
  }
  toggleUserStatus(): void {
  this.user.status = this.user.status === 'Active' ? 'Deleted' : 'Active';
  this.userService.setUser(this.user); // Optional: update temp state
}

 async saveChanges(): Promise<void> {
  this.loading = true;
  try {
    // Only upload image for non-admin
    if (!this.isAdmin && this.selectedFile) {
      const uploadedUrl = await this.userService.uploadProfilePicture(this.selectedFile);
      this.user.avatarUrl = uploadedUrl;
    }

    // Admin-specific save
    if (this.viewerIsAdmin) {
      this.userService.updateUserByEmail(this.user.email, this.user);

      // 💾 Save status to localStorage (as part of booking data)
      const storedBookings = JSON.parse(localStorage.getItem('Cancelledbookings') || '{}');
      storedBookings[this.user.email] = {
        ...(storedBookings[this.user.email] || {}),
        status: this.user.status
      };
      localStorage.setItem('Cancelledbookings', JSON.stringify(storedBookings));
    } else {
      this.userService.updateUserByEmail(this.user.email, this.user);
    }

    if (isPlatformBrowser(this.platformId)) {
      alert(this.viewerIsAdmin ? 'Status updated successfully!' : 'Profile updated successfully!');
    }

    this.selectedFile = null;
    this.previewUrl = null;
  } catch {
    if (isPlatformBrowser(this.platformId)) {
      alert('Failed to update profile.');
    }
  } finally {
    this.loading = false;
  }
}
  goBack(): void {
    if (this.viewerIsAdmin) {
      this.router.navigate(['/admin-dashboard/user-list']);
    } else {
      this.router.navigate(['/']);
    }
  }

  openCancelPopup(bookingId: string): void {
    this.cancelTargetId = bookingId;
    this.showCancelModal = true;
  }

  closeCancelPopup(): void {
    this.cancelTargetId = null;
    this.showCancelModal = false;
  }

confirmCancel(): void {
  if (!this.cancelTargetId) return;

  const currentUser = this.userService.getUser();
  const storedBookingStr = localStorage.getItem('booking');

  if (!storedBookingStr || !currentUser) {
    this.closeCancelPopup();
    return;
  }

  try {
    let bookings: Booking[] = JSON.parse(storedBookingStr);
    let updated = false;

    bookings = bookings.map(b => {
      if (b.id === this.cancelTargetId && b.userId === currentUser.id && b.status === 'Reserved') {
        updated = true;
        return { ...b, status: 'Cancelled' };
      }
      return b;
    });

    if (updated) {
      localStorage.setItem('booking', JSON.stringify(bookings));
      console.log('Booking cancelled and updated in localStorage.');

      // Sync change to in-memory user object as well
      this.user.bookings = this.user.bookings?.map(b =>
        b.id === this.cancelTargetId ? { ...b, status: 'Cancelled' } : b
      );

      this.userService.setUser(this.user);
      this.refreshBookingsDisplay();
    }

  } catch (e) {
    console.error('Error updating booking cancellation:', e);
  }

  this.closeCancelPopup();
}

  signOut(): void {
    this.userService.signOut();
    this.router.navigate(['/']);
  }
}
