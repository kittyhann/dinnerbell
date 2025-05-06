import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// src/app/components/signin/signin.component.ts
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'; // Import directly from the model file


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SigninComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchForm = new EventEmitter<'signin' | 'signup'>();

  userName: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  signIn() {
    const trimmedUserName = this.userName.trim();
    const trimmedPassword = this.password.trim();

    if (trimmedUserName === '' || trimmedPassword === '') {
      alert('Please enter both username and password!');
      return;
    }

    const storedUser: User | null = this.userService.getRegisteredUser();
    console.log('Stored User:', storedUser);

    if (
      storedUser &&
      storedUser.name === trimmedUserName &&
      storedUser.password === trimmedPassword
    ) {
      this.userService.setUser(storedUser); // Set user to logged in
      alert('You have successfully logged in!');
      this.close.emit();
      this.router.navigateByUrl('/userhome');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  switchToSignUp() {
    this.switchForm.emit('signup');
  }
}
