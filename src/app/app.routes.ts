import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'contact', component: ContactComponent }, 
  // future routes go here
];
