import {Action} from '@ngrx/store';
import {Exercise} from './models/exercise.model';
import {Run} from './models/running.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAINING = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Stop Training';
export const STOP_TRAINING = '[Training] Start Training';
export const START_RUN = '[Training] Start Run';
export const STOP_RUN = '[Training] Stop Run';
export const SET_ROUTES_RUN = '[Training] Set Routes Run';



export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(public payload: Exercise[]) {
  }
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAINING;
  constructor(public payload: Exercise[]) {
  }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: string) {
  }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export class StartRun implements Action {
  readonly type = START_RUN;
}

export class StopRun implements Action {
  readonly type = STOP_RUN;
}

export class SetRoutesRun implements Action {
  readonly type = SET_ROUTES_RUN;
  constructor(public payload: Run[]) {
  }
}

export type TrainingActions =
  SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining | StartRun | StopRun | SetRoutesRun;
