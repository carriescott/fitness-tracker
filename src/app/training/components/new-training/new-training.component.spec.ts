import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewTrainingComponent } from './new-training.component';
import {MaterialModule} from '../../../shared/modules/material.module';
import {NgForm} from '@angular/forms';

fdescribe('NewTrainingComponent', () => {
  let component: NewTrainingComponent;
  let fixture: ComponentFixture<NewTrainingComponent>;
  let fetchExerciseSpy: jasmine.Spy;
  let onStartSpy: jasmine.Spy;
  let fetchAvailableExercisesSpy: jasmine.Spy;
  let submitFormSpy: jasmine.Spy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [ NewTrainingComponent, NgForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrainingComponent);
    component = fixture.componentInstance;
    fetchExerciseSpy = spyOn(component, 'fetchExercises').and.callThrough();
    onStartSpy = spyOn(component, 'onStart').and.callThrough();
    fetchAvailableExercisesSpy = spyOn(component.fetchAvailableExercises, 'emit');
    submitFormSpy = spyOn(component.submitForm, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke the fetchAvailableExercises event emitter', () => {
    component.fetchExercises();
    expect(fetchAvailableExercisesSpy).toHaveBeenCalled();
    expect(fetchAvailableExercisesSpy).toHaveBeenCalledTimes(1);
  });

  it('should invoke the fetchAvailableExercises event emitter', () => {
    component.onStart(component.exerciseForm);
    expect(submitFormSpy).toHaveBeenCalledWith(component.exerciseForm);
    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

});
