import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Run } from '../../models/running.model';
import {GoogleMapsModule} from '@angular/google-maps';
import { MaterialModule} from '../../../shared/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PastRunsComponent } from './past-runs.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';


xdescribe('PastRunsComponent', () => {
  let component: PastRunsComponent;
  let fixture: ComponentFixture<PastRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        GoogleMapsModule
      ],
      declarations: [
        PastRunsComponent,
        GoogleMap
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
