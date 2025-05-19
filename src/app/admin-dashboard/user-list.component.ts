import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<User & { joined: string; status: string }> = [];
  searchTerm = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  

  loadUsers() {
    const storedUsers: User[] = this.userService.getAllUsers();
    const bookingStorage = JSON.parse(localStorage.getItem('Cancelledbookings') || '{}');

    this.users = storedUsers.map(user => {
      const storedStatus = bookingStorage[user.email]?.status;
      return {
        ...user,
        joined: user.joinedOn || 'N/A',
        status: storedStatus || user.status || 'Active'
      };
    });
  }

  deleteUser(email: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) return;

    // Toggle status instead of hard deleting
    user.status = user.status === 'Active' ? 'Deleted' : 'Active';

    // Update localStorage.booking
    const bookingStorage = JSON.parse(localStorage.getItem('Cancelledbookings') || '{}');
    bookingStorage[email] = {
      ...(bookingStorage[email] || {}),
      status: user.status
    };
    localStorage.setItem('Cancelledbookings', JSON.stringify(bookingStorage));

    console.log(`User ${email} status changed to: ${user.status}`);
  }

  goToUserProfile(email: string) {
    this.router.navigate(['/profile', email]);
  }
}
