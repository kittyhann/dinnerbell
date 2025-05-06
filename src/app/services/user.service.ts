import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User, Booking } from '../models/user.model'; // ✅ Import models

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = false;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private registeredUser: User | null = null;

  showSignIn$ = new BehaviorSubject(false);
  showSignUp$ = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.loadUserFromLocalStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadUserFromLocalStorage() {
    if (this.isBrowser()) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user: User = JSON.parse(storedUser);
          this.userSubject.next(user);
          this.loggedIn = true;
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
        }
      }
    }
  }

  registerUser(user: User) {
    this.registeredUser = user;
    if (this.isBrowser()) {
      localStorage.setItem('registeredUser', JSON.stringify(user));
    }
  }

  getRegisteredUser(): User | null {
    if (!this.registeredUser && this.isBrowser()) {
      const stored = localStorage.getItem('registeredUser');
      if (stored) {
        try {
          this.registeredUser = JSON.parse(stored);
        } catch (error) {
          console.error("Failed to parse registered user from localStorage", error);
        }
      }
    }
    return this.registeredUser;
  }

  removeRegisteredUser() {
    this.registeredUser = null;
    if (this.isBrowser()) {
      localStorage.removeItem('registeredUser');
    }
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  setUser(user: User) {
    const newUser = { ...user }; // 👈 Force a new reference
    this.userSubject.next(newUser);
    this.loggedIn = true;
    if (this.isBrowser()) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  }
  clearUser() {
    this.userSubject.next(null);
    this.loggedIn = false;
    if (this.isBrowser()) {
      localStorage.removeItem('user');
    }
  }

  signOut() {
    this.clearUser();
    this.router.navigate(['/']);
  }

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

  async uploadProfilePicture(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  addBooking(booking: Booking) {
    const user = this.getUser();
    if (!user) return;

    if (!user.bookings) {
      user.bookings = [];
    }

    user.bookings.unshift(booking); // Most recent first
    this.setUser(user);
  }
}
