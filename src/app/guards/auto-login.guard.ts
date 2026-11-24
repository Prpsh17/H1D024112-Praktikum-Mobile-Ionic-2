import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canLoad(): Observable<boolean> {
    console.log('cek sesi login');
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial BehaviorSubject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Ada sesi login, redirect ke dashboard');
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
          return false; // Perbaikan: wajib mengembalikan boolean di strict mode
        } else {
          console.log('tidak ada sesi login');
          return true;
        }
      })
    );
  }
}