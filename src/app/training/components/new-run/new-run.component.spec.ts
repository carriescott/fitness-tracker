import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/modules/material.module';
import { NewRunComponent } from './new-run.component';

describe('NewRunComponent', () => {
  let component: NewRunComponent;
  let fixture: ComponentFixture<NewRunComponent>;
  let newRunSpy: jasmine.Spy;
  let loggingRunSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [ NewRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRunComponent);
    component = fixture.componentInstance;
    newRunSpy = spyOn(component, 'logRun').and.callThrough();
    loggingRunSpy = spyOn(component.startLoggingRun, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke the startLoggingRun event emitter', () => {
    component.logRun();
    expect(loggingRunSpy).toHaveBeenCalled();
    expect(loggingRunSpy).toHaveBeenCalledTimes(1);
  });
});
