import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubs!: Subscription;
  
  constructor(
    private authService: AuthService,
    private uiService: UIService
  ) {};

  ngOnInit(): void {
      this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
        this.isLoading = isLoading;
      })
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
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
    this.isLoading = true;
    const email = this.loginForm.value.email ?? ''; // Assign an empty string if email is undefined or null
    const password = this.loginForm.value.password ?? ''; // Assign an empty string if password is undefined or null
    this.authService.login({
      email: email,
      password: password
    });
  }
}
