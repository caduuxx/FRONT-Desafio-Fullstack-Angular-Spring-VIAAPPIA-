import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente.';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: (response: { token: string }) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/incidents']); // manda pro dashboard
        }
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
