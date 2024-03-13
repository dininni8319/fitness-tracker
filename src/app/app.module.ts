import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTraningComponent } from './training/current-traning/current-traning.component';
import { NewTraningComponent } from './training/new-traning/new-traning.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { IsMobileDirective } from './is-mobile.directive';
import { IsDesktopDirective } from './is-desktop.directive';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { StopTrainingComponent } from './training/current-traning/stop-training.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/traning.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTraningComponent,
    NewTraningComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    IsMobileDirective,
    IsDesktopDirective,
    PastTrainingComponent, 
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent]
})

export class AppModule { }
