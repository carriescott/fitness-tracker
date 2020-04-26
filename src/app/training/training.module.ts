import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {TrainingRoutingModule} from './training-routing.module';
import {trainingReducer} from './training.reducer';
import { NewRunComponent } from './new-run/new-run.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    NewRunComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}
