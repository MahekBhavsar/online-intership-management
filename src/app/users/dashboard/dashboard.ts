import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { InternshipProgram } from '../../Interfaces/intership-program';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Header, Navbar, Footer], // Removed FormsModule if using (input) event
  templateUrl: './dashboard.html',
  styleUrl:'./dashboard.css'
})
export class Dashboard {

}
