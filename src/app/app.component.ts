import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>VIAAPPIA</span>
      <span class="spacer"></span>
      <button mat-icon-button (click)="toggleTheme()">
        <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </mat-toolbar>
    <div [ngClass]="{ 'dark-theme': isDarkTheme }">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .dark-theme { background: #121212; color: #fff; min-height: 100vh; }
  `],
  standalone: true,
  imports: [RouterOutlet, NgClass, MatToolbarModule, MatIconModule]
})
export class AppComponent {
  isDarkTheme = false;
  toggleTheme() { this.isDarkTheme = !this.isDarkTheme; }
}
