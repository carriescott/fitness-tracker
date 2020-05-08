import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/modules/material.module';
import { NewTrainingComponent} from '../../components/new-training/new-training.component';
import { NewRunComponent } from '../../components/new-run/new-run.component';
import { PastTrainingsComponent } from '../../components/past-trainings/past-trainings.component';
import { PastRunsComponent } from '../../components/past-runs/past-runs.component';
import { CurrentTrainingComponent } from '../../current-training/current-training.component';
import { MapComponent } from '../../components/map/map.component';
import { TrainingComponent } from './training.component';
import {Observable} from 'rxjs';
import {TrainingService} from '../../services/training.service';
import {Exercise} from '../../models/exercise.model';
import {Store} from '@ngrx/store';
import * as fromTraining from '../../training.reducer';
import {Run} from '../../models/running.model';
import * as fromRoot from '../../../app.reducer';
import {MatTableDataSource} from '@angular/material/table';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService} from '../../../shared/ui.service';

fdescribe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let mockTrainingService: {
    fetchAvailableExercise: jasmine.Spy;
    startExercise: jasmine.Spy;
    logRun: jasmine.Spy;
    stopLoggingRun: jasmine.Spy;
    addRun: jasmine.Spy;
    completeExercise: jasmine.Spy;
    cancelExercise: jasmine.Spy;
    fetchCompletedOrCanceledExercises: jasmine.Spy;
    fetchRunningRoutes: jasmine.Spy;
    cancelSubscriptions: jasmine.Spy;
    subscribe: jasmine.Spy;
  };
  let store: {
    dispatch: jasmine.Spy;
    pipe: jasmine.Spy;
    select: jasmine.Spy;
    subscribe: jasmine.Spy;
  };

  const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'pipe', 'select', 'subscribe']);

  const trainingServiceSpy = jasmine.createSpyObj('TrainingService',
    ['fetchAvailableExercise', 'startExercise', 'logRun', 'stopLoggingRun',
      'addRun', 'completeExercise', 'cancelExercise', 'fetchCompletedOrCanceledExercises',
      'fetchRunningRoutes', 'cancelSubscriptions', 'subscribe' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule],
      declarations: [ NewTrainingComponent,
        TrainingComponent,
        NewTrainingComponent,
        NewRunComponent,
        PastTrainingsComponent,
        PastRunsComponent,
        CurrentTrainingComponent,
        MapComponent
      ],
      providers: [
        {provide: TrainingService, useValue: mockTrainingService},
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();
    mockTrainingService = trainingServiceSpy;
    store = storeSpy;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
