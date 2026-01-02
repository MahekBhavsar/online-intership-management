import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  name: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

@Component({
  selector: 'app-interview',
  imports: [CommonModule],
  templateUrl: './interview.html',
  styleUrl: './interview.css',
})
export class Interview {
  users: User[] = [
    { name: 'Rahul Sharma', status: 'Pending' },
    { name: 'Priya Patel', status: 'Pending' },
    { name: 'Aman Verma', status: 'Pending' }
  ];

  acceptUser(user: User): void {
    user.status = 'Accepted';
  }

  rejectUser(user: User): void {
    user.status = 'Rejected';
  }
}
// users: User[] = [];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     // User data coming from another module
//     this.users = this.userService.getUsers();
//   }

//   acceptUser(user: User): void {
//     this.userService.updateUserStatus(user, 'Accepted');
//   }

//   rejectUser(user: User): void {
//     this.userService.updateUserStatus(user, 'Rejected');
//   }}
// // DO NOT MODIFY – already created by user module
// @Injectable({ providedIn: 'root' })
// export class UserService {
//   getUsers(): User[] {
//     return [];
//   }

//   updateUserStatus(user: User, status: string) {}
// }
