import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { IsMobileDirective } from './is-mobile.directive';
import { IsDesktopDirective } from './is-desktop.directive';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/traning.service';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    IsMobileDirective,
    IsDesktopDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // initialize the firebase app
    AuthModule, StoreModule.forRoot(reducers),
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})

export class AppModule { }
