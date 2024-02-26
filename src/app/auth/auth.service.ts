import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>(); // Observable for notifying about changes in authentication status
  private user: User | null = null;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString() // not unique ID
    }
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString() // not unique ID
    }
    this.authSuccessfully();
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
    this.router.navigate(['/login']);
  }

  private authSuccessfully() {
    this.authChange.next(true); // notify about change in authentication status 
    this.router.navigate(['/training']); // redirect to training page after registration
  }
}