import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {FlexOrderDirective} from '@angular/flex-layout';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group ({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
