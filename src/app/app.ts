import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Add it to the imports array
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private firestore = inject(Firestore);

  connectionStatus = signal('Connecting...');
  isSuccess = signal(false);

  ngOnInit() {
    if (this.firestore) {
      this.connectionStatus.set('Firebase Connection Successful! ✅');
      this.isSuccess.set(true);
    }
  }
}