import { NgModule } from "@angular/core";
import { TrainingComponent } from "./training.component";
import { NewTraningComponent } from "./new-traning/new-traning.component";
import { CurrentTraningComponent } from "./current-traning/current-traning.component";
import { StopTrainingComponent } from "./current-traning/stop-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SharedModule } from "../shared/shared.module";
import { TrainingRoutingModule } from "./training-routing.module";
import { StoreModule } from "@ngrx/store";
import { trainingReducer } from "./training.reducer";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTraningComponent,
    NewTraningComponent,
    PastTrainingComponent, 
    StopTrainingComponent
  ],
  imports: [
    AngularFirestoreModule,
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer) //load the training reducer into the store lazy-loaded module.
  ],
  exports: []
})

export class TrainingModule {}