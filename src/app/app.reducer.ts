import * as fromUi from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { UIActions } from './shared/ui.actions';


// we inform on how the states of the app look like
export interface State {
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State, UIActions> = { 
  ui: fromUi.uiReducer, // this is a function that returns the reducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui')// this is a selector that returns the ui state
// this is a selector that returns the isLoading property from the ui state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading) // useful for accessing in the components