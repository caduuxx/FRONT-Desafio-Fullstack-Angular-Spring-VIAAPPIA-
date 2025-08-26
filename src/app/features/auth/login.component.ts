import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/incidents']);
        }
      },
      error: () => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    });
  }
}
