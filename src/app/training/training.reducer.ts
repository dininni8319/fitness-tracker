import { Exercise } from './exercise.model';
import { createFeatureSelector, createSelector} from '@ngrx/store';
import { 
  TrainingActions, 
  SET_AVAILABLE_TRAINING, 
  SET_FINISHED_TRAINING,
  START_TRAINING,
  STOP_TRAINING
} from './training.actions';

import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};


export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
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
        activeTraining: null,
      };
    default: {
      return state;
    }
  }
}


export const getTrainingState = createFeatureSelector<TrainingState>('training');

// Selectors are helper functions that allow us to extract data from the state.
export const getAvailableExercises = createSelector(getTrainingState,(state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState,(state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState,(state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState,(state: TrainingState) => state.activeTraining != null); // if is not null means we are training
