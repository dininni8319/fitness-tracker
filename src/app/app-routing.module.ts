import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) // global
  ],
  exports: [RouterModule],
  providers: [AuthGuard] // make sure the guard is available to all components
})

export class AppRoutingModule { }
