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

  private registeredUser: User | null = null;

  showSignIn$ = new BehaviorSubject(false);
  showSignUp$ = new BehaviorSubject(false);

  private readonly STORAGE_KEY = 'registeredUsers';
  private readonly CURRENT_USER_KEY = 'currentUser';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadUserFromLocalStorage();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadUserFromLocalStorage() {
    if (this.isBrowser()) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user: User = JSON.parse(storedUser);
          this.userSubject.next(user);
        } catch (error) {
          console.error('Failed to parse user from localStorage', error);
        }
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
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  }

  clearUser() {
    this.userSubject.next(null);
    if (this.isBrowser()) {
      localStorage.removeItem('user');
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

  // ------------------------- Registration & Users List -------------------------

  registerUser(user: User) {
    const users = this.getAllUsers();
    users.push(user);
    if (this.isBrowser()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
  }

  getAllUsers(): User[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getRegisteredUserByEmail(email: string): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.email === email) || null;
  }

  getCurrentUser(): User | null {
    if (!this.isBrowser()) return null;
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  removeRegisteredUser() {
    this.registeredUser = null;
    if (this.isBrowser()) {
      localStorage.removeItem('registeredUser');
    }
  }

  getUsers(): User[] {
    if (!this.isBrowser()) return [];
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  addUser(user: User) {
    const users = this.getUsers();
    users.push(user);
    if (this.isBrowser()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
  }

  updateUser(updatedUser: User) {
    let users = this.getUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
      users[index] = updatedUser;
      if (this.isBrowser()) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
      }

      if (this.getUser()?.email === updatedUser.email) {
        this.setUser(updatedUser);
      }
    }
  }

  // ------------------------- Bookings -------------------------

  addBooking(booking: Booking) {
    const user = this.getUser();
    if (!user) return;

    user.bookings = user.bookings || [];
    user.bookings.unshift(booking);
    this.setUser(user);
    this.updateUser(user);
  }

  removeBooking(booking: Booking) {
    const user = this.getUser();
    if (!user || !user.bookings) return;

    const index = user.bookings.findIndex(b => b === booking);
    if (index > -1) {
      user.bookings.splice(index, 1);
      this.setUser(user);
      this.updateUser(user);
    }
  }

  // ------------------------- Profile Picture -------------------------

  async uploadProfilePicture(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
