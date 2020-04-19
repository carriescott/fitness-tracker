import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      console.log('logged in');
      console.log('unknown', this.authService.isAuth());
      return true;
    } else {
      console.log('logged out');
      this.router.navigate(['/login']);
    }
  }

}
