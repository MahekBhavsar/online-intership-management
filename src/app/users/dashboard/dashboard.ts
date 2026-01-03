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
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private firebaseService = inject(FirebaseService);
  searchFilter$ = new BehaviorSubject<string>('');
  filteredPrograms$!: Observable<InternshipProgram[]>;

  ngOnInit(): void {
    // 1. Get live stream and cache it to stop the "loading flash"
    const liveData$ = this.firebaseService
      .getCollection<InternshipProgram>(FirebaseCollections.Intership_program)
      .pipe(shareReplay(1));

    // 2. Combine data with search input for real-time filtering
    this.filteredPrograms$ = combineLatest([liveData$, this.searchFilter$]).pipe(
      map(([programs, query]) => {
        const term = query.toLowerCase();
        return programs.filter(p =>
          (p.isActive === true || (p as any).isActive === 'true') &&
          (p.programName.toLowerCase().includes(term) || p.courseName.toLowerCase().includes(term))
        );
      })
    );
  }

  onSearch(event: any) {
    this.searchFilter$.next(event.target.value);
  }
}