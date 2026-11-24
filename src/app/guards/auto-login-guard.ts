import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

export const autoLoginGuard: CanMatchFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  console.log('cek sesi login');
  return authService.isAuthenticated.pipe(
    filter((val) => val !== null),
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('Ada sesi login, redirect ke dashboard');
        router.navigateByUrl('/dashboard', { replaceUrl: true });
        return false;
      } else {
        console.log('tidak ada sesi login');
        return true;
      }
    })
  );
};