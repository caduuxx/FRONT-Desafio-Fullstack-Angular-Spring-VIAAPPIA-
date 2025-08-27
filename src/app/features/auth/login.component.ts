import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Preencha email e senha';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/incidents']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Credenciais inválidas. Tente novamente.';
      }
    });
  }
}
