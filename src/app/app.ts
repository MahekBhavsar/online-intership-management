import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './users/dashboard/dashboard';
import { Interview } from "./interview/interview";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Interview],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}