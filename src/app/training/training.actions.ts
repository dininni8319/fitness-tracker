import { Action } from "@ngrx/store";
import { Exercise } from "./exercise.model";

export const SET_AVAILABLE_TRAINING = '[Training]] Set Available Training';
export const SET_FINISHED_TRAINING = '[Training] Set Finished Training';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetAvailableTrainings implements Action { 
  readonly type = SET_AVAILABLE_TRAINING;

  // payload is an array of Exercise objects
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAINING;

  // payload is an array of Exercise objects
  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  // payload is an Exercise object
  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}
// Export a type alias of all actions in this action group
export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;