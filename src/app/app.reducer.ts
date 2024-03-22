import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { UIActions } from './shared/ui.actions';
import { AuthActions } from './auth/auth.actions';


// we inform on how the states of the app look like
export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State, UIActions | AuthActions> = { 
  ui: fromUi.uiReducer, // this is a function that returns the reducer
  auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui')// this is a selector that returns the ui state
// this is a selector that returns the isLoading property from the ui state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading) // useful for accessing in the components

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);