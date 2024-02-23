import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {};

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
