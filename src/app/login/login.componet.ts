import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/incidents']); // manda pro dashboard
        }
      },
      error: () => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    });
  }
}
