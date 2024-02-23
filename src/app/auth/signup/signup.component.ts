import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  maxDate: Date | null = null;

  constructor(private authService: AuthService) { };

  ngOnInit(): void {
    this.maxDate = new Date();
    console.log('date: ',this.maxDate.setFullYear(this.maxDate.getFullYear() - 18));
    
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
