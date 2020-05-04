import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Observable} from 'rxjs';
import { Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService) { }

  ngOnInit(): void {
  this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}
