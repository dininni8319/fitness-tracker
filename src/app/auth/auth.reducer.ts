import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';
import { Action } from '@ngrx/store';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};


export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

// Selectors are helper functions that allow us to extract data from the state.
export const getIsAuth = (state: State) => state.isAuthenticated;