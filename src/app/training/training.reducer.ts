import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAINING,
  SET_ROUTES_RUN,
  START_RUN,
  START_TRAINING,
  STOP_RUN,
  STOP_TRAINING,
  TrainingActions
} from './training.actions';
import {Exercise} from './models/exercise.model';
import {Run} from './models/running.model';
import * as fromRoot from '../app.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
  routesRun: Run[];
  loggingRun: boolean;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
  routesRun: [],
  loggingRun: false
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
       availableExercises: action.payload
      };
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(ex => ex.id === action.payload)}
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
      case START_RUN:
      return {
        ...state,
        loggingRun: true
      };
    case STOP_RUN:
      return {
        ...state,
        loggingRun: false
      };
    case SET_ROUTES_RUN:
      return {
        ...state,
        routesRun: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
export const IsLoggingRun = createSelector(getTrainingState, (state: TrainingState) => state.loggingRun);
export const getRoutesRun = createSelector(getTrainingState, (state: TrainingState) => state.routesRun);
