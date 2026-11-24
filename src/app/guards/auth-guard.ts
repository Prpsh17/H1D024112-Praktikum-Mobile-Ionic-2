import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanMatchFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated.pipe(
    filter((val) => val !== null),
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigateByUrl('/');
        console.log('anda harus login dulu');
        return false;
      }
    })
  );
};