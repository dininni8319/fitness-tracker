import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/traning.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UIService } from "../shared/ui.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>(); // Observable for notifying about changes in authentication status
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true); // notify about change in authentication status 
        this.router.navigate(['/training']); // redirect to training page after registration
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(
        'User registered successfully', 
        'Close', 
        { duration: 2000}
      );
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.showErrorSnackbar(error.message || 'An unknown error occurred!');
      console.log(error);
    });
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString() // not unique ID
    // }
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(
      authData.email, 
      authData.password
    ).then(result => {
      console.log("🚀 ~ AuthService ~ login ~ result:", result)
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(
        'User logged in successfully', 
        'Close', 
        { duration: 2000}
      );
    })
    .catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.showErrorSnackbar(error.message || 'An unknown error occurred!');
      console.log("🚀 ~ AuthService ~ login ~ error:", error)
    });
  }

  isAuth() {
    return this.isAuthenticated;
  }

  logout(){
    this.afAuth.signOut(); // get rid of the token
    this.snackBar.open(
      'User logged out successfully', 
      'Close', 
      { duration: 2000}
    );
  }

  showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // Positioning
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'] // Custom CSS class for styling
    });
  }
}