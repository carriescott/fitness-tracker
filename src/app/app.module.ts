import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule} from './shared/modules/material.module';
import { AppRoutingModule } from './app-routing.module';

import {AuthModule} from './auth/auth.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidnavListComponent } from './navigation/sidnav-list/sidnav-list.component';
import {AuthService} from './auth/services/auth.service';
import {TrainingService} from './training/services/training.service';

import {AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import {UIService} from './shared/ui.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidnavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    AuthModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  // ensures the same instance of services is used across the entire app
  providers: [AuthService,
  TrainingService,
  UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
