import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date | null = null;
  isLoading$: Observable<boolean> | undefined;
  private loadingSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ui:fromRoot.State}> // to access the state of the app
  ) { };

  ngOnInit(): void {
    this.maxDate = new Date();
    console.log('date: ',this.maxDate.setFullYear(this.maxDate.getFullYear() - 18));
    
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
  }

  ngOnDestroy(): void {
     if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
     } 
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
