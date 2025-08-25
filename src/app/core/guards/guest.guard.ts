import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    // se já tá logado, manda direto pra lista de incidents
    this.router.navigate(['/incidents']);
    return false;
  };
}
