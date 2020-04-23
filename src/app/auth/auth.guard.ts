import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanLoad} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Route} from '@angular/router';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

}
