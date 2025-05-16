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
    this.users = storedUsers.map(user => ({
      ...user,
      joined: user.joinedOn || 'N/A',
      status: user.status || 'Active'
    }));
  }

  goToUserProfile(email: string) {
    this.router.navigate(['/profile', email]);
  }
}
