import { AuthData } from './auth-data.model';
import { Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {

  // authChange = new Subject<boolean>();
  // private isAuthenticated = false;

  constructor(private router: Router,
              private auth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    // emits event when ever the authentication status changes
    this.auth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        // this.authChange.next(false);
        this.router.navigate(['/login']);
        // this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.auth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.store.dispatch(new UI.StopLoading());
      // this.uiService.loadingStateChanged.next(false);
    })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.auth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.auth.auth.signOut();
  }

  // isAuth() {
  //   return this.isAuthenticated;
  // }


}
