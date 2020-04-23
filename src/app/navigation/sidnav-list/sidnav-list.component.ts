import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Observable} from 'rxjs';
import { Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidnav-list',
  templateUrl: './sidnav-list.component.html',
  styleUrls: ['./sidnav-list.component.css']
})
export class SidnavListComponent implements OnInit {

  @Output()
  closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    // store subscription
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }


}
