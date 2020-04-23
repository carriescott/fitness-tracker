import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {FlexOrderDirective} from '@angular/flex-layout';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {UIService} from '../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private uiService: UIService,
              private store: Store<fromRoot.State> ) {}

  ngOnInit(): void {
    // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.loginForm = this.fb.group ({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
