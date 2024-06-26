import { NgModule } from "@angular/core";
import { TrainingComponent } from "./training.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { 
    path: '', 
    component: TrainingComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})

export class TrainingRoutingModule {}