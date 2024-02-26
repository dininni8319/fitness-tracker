import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";

export class AuthService {
  authChange = new Subject<boolean>(); // Observable for notifying about changes in authentication status
  private user: User | null = null;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString() // not unique ID
    }

    this.authChange.next(true); // notify about change in authentication status 
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString() // not unique ID
    }
    this.authChange.next(true); // notify about change in authentication status
  }

  getUser() {
    return {...this.user}; // make sure to return a copy
  }

  isAuth() {
    return this.user != null;
  }

  logout(){
    if (this.user != null) {
      this.user = null;
    }
    this.authChange.next(false);
  }
}