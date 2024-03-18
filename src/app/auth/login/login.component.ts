import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean> | undefined;
  private loadingSubs!: Subscription;
  
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ui:fromApp.State}> // to access the state of the redux store
  ) {};

  ngOnInit(): void {
    this.isLoading$ = this.store.select(
      state => state.ui.isLoading
    )
  
    
    // this.store.subscribe(data => console.log(data))
      
      // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      //   this.isLoading = isLoading;
      // })
  }

  // ngOnDestroy(): void {
  //   // if (this.loadingSubs) {
  //   //   this.loadingSubs.unsubscribe();
  //   //  } 
  // }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email, 
      Validators.required
    ]),
    password: new FormControl('', 
      [Validators.required]
    )
  })

  onSubmit() {
    // this.isLoading = true;
    const email = this.loginForm.value.email ?? ''; // Assign an empty string if email is undefined or null
    const password = this.loginForm.value.password ?? ''; // Assign an empty string if password is undefined or null
    this.authService.login({
      email: email,
      password: password
    });
  }
}
