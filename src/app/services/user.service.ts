import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User, Booking } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  showSignIn$ = new BehaviorSubject(false);
  showSignUp$ = new BehaviorSubject(false);

  private readonly STORAGE_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadCurrentUser();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadCurrentUser() {
    if (!this.isBrowser()) return;

    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.userSubject.next(user);
      } catch (error) {
        console.error('Failed to parse current user', error);
      }
    }
  }

  // ------------------------- Auth & Session -------------------------

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  setUser(user: User) {
    const newUser = { ...user };
    this.userSubject.next(newUser);

    if (this.isBrowser()) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));
    }
  }

  clearUser() {
    this.userSubject.next(null);
    if (this.isBrowser()) {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  signOut() {
    this.clearUser();
    this.router.navigate(['/']);
  }

  // ------------------------- Modal Management -------------------------

  openSignIn() {
    this.showSignIn$.next(true);
    this.showSignUp$.next(false);
  }

  openSignUp() {
    this.showSignUp$.next(true);
    this.showSignIn$.next(false);
  }

  closeModals() {
    this.showSignIn$.next(false);
    this.showSignUp$.next(false);
  }

  // ------------------------- User Management -------------------------

  getAllUsers(): User[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveAllUsers(users: User[]) {
    if (this.isBrowser()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
  }

  registerUser(user: User) {
    const users = this.getAllUsers();
    users.push(user);
    this.saveAllUsers(users);
  }

  getRegisteredUserByEmail(email: string): User | null {
    return this.getAllUsers().find(user => user.email === email) || null;
  }

  updateUser(updatedUser: User) {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);

    if (index !== -1) {
      users[index] = updatedUser;
      this.saveAllUsers(users);

      if (this.getUser()?.email === updatedUser.email) {
        this.setUser(updatedUser);
      }
    }
  }

  getCurrentUserFromList(): User | null {
    const sessionUser = this.getUser();
    if (!sessionUser) return null;

    return this.getAllUsers().find(u => u.email === sessionUser.email) || null;
  }

  // ------------------------- Bookings -------------------------

  getAdminReservations(): Booking[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem('adminReservations');
    return data ? JSON.parse(data) : [];
  }

  setAdminReservations(bookings: Booking[]) {
    if (this.isBrowser()) {
      localStorage.setItem('adminReservations', JSON.stringify(bookings));
    }
  }

  addBooking(booking: Booking) {
    const user = this.getCurrentUserFromList();
    if (!user) return;

    user.bookings = user.bookings || [];
    user.bookings.unshift(booking);
    this.updateUser(user);

    const adminReservations = this.getAdminReservations();
    adminReservations.push(booking);
    this.setAdminReservations(adminReservations);
  }

  removeBooking(booking: Booking) {
    const user = this.getCurrentUserFromList();
    if (!user?.bookings) return;

    user.bookings = user.bookings.filter(b =>
      !(b.date === booking.date && b.time === booking.time && b.guests === booking.guests)
    );
    this.updateUser(user);

    let adminReservations = this.getAdminReservations();
    adminReservations = adminReservations.filter(b =>
      !(b.date === booking.date && b.time === booking.time && b.guests === booking.guests)
    );
    this.setAdminReservations(adminReservations);
  }

  // ------------------------- Profile Picture -------------------------

  async uploadProfilePicture(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
  updateUserByEmail(email: string, updatedUser: User): void {
  const allUsers = this.getAllUsers();
  const index = allUsers.findIndex(u => u.email === email);
  if (index !== -1) {
    allUsers[index] = updatedUser;
    localStorage.setItem('users', JSON.stringify(allUsers));
  }
}

}
