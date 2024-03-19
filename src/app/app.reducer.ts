import * as fromUi from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { UIActions } from './shared/ui.actions';


// we inform on how the states of the app look like
export interface State {
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State, UIActions> = { 
  ui: fromUi.uiReducer, // this is a function that returns the reducer
}
