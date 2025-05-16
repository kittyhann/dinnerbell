// src/app/models/user.model.ts

export interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: 'Reserved' | 'Cancelled' | 'Completed';
  
}

// In user.model.ts
export interface User {
    email: string;
    name: string;
    phone: string;
    avatarUrl: string;
    bookings: Booking[];
    password?: string; // Make password optional
    role?: 'user' | 'admin';
    joinedOn?: string;
    status?: 'Active' | 'Deleted';
  }
  
  
  