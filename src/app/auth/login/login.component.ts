import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';


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
    private store: Store<{ui:fromRoot.State}> // to access the state of the redux store
  ) {};

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

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
    const email = this.loginForm.value.email ?? ''; // Assign an empty string if email is undefined or null
    const password = this.loginForm.value.password ?? ''; // Assign an empty string if password is undefined or null
    this.authService.login({
      email: email,
      password: password
    });
  }
}
