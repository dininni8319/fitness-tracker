import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED= '[Auth]] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

export class SetAuthenticated implements Action { 
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

// Export a type alias of all actions in this action group
export type AuthActions = SetAuthenticated | SetUnauthenticated;