import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
// src/app/components/navbar/navbar.component.ts
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'; // Correct the import path here
import { SignupOtpComponent } from '../../signup-otp/signup-otp.component';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, SigninComponent, RouterModule, SignupComponent, SignupOtpComponent],
})
export class NavbarComponent implements OnInit, OnDestroy {
  showSignIn = false;
  showSignUp = false;
  showOtp = false;
  menuOpen = false;
  user: User | null = null;
  activeAuthBtn: 'signin' | 'signup' | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.subscriptions.add(
      this.userService.showSignIn$.subscribe((show) => {
        this.showSignIn = show;
      })
    );
    this.subscriptions.add(
      this.userService.showSignUp$.subscribe((show) => {
        this.showSignUp = show;
      })
    );
    this.subscriptions.add(
      this.userService.user$.subscribe((user) => {
        this.user = user;
      })
    );
  }
  

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openSignIn() {
    this.showSignIn = true;
    this.showSignUp = false;
  }

  openSignUp() {
    this.showSignUp = true;
    this.showSignIn = false;
  }

setActive(btn: 'signin' | 'signup') {
  this.activeAuthBtn = btn;
}


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.classList.toggle('menu-open', this.menuOpen);
  }

  closeMenu() {
    this.menuOpen = false; // Closes the navbar when called
  }
  closeModals() {
    this.showSignIn = false;
    this.showSignUp = false;
    this.showOtp = false;
  }

  handleFormSwitch(target: 'signin' | 'signup' | 'otp') {
    this.showSignIn = target === 'signin';
    this.showSignUp = target === 'signup';
    this.showOtp = target === 'otp';
  }

  signOut() {
    const confirmed = confirm('Are you sure you want to sign out?');
    if (confirmed) {
      this.userService.clearUser();
      this.router.navigateByUrl('/');
    }
  }
}

