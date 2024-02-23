import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

export class AuthService {
  private user: User;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString() // not unique ID
    }
  }

  login(authData: AuthData) {
    this.user = null;
  }

  getUser() {
    return {...this.user}; // make sure to return a copy
  }

  isAuth() {
    return this.user != null;
  }
}