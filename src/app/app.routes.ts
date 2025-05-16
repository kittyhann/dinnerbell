import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './admin-dashboard/user-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profile/:email', component: UserProfileComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminDashboardComponent },
  {
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, // Main admin dashboard wrapper
    children: [
      { path: 'user-list', component: UserListComponent }, // Child route for the user list
    ]
  },
];


