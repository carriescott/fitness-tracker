import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';

import { TrainingComponent } from './containers/training/training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {TrainingRoutingModule} from './training-routing.module';
import {trainingReducer} from './training.reducer';
import { NewRunComponent } from './components/new-run/new-run.component';
import { MapComponent } from './components/map/map.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { PastRunsComponent } from './components/past-runs/past-runs.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    NewRunComponent,
    MapComponent,
    PastRunsComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
    GoogleMapsModule
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}
