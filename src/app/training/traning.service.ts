import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UIService } from "../shared/ui.service";
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  private fbSubs: Subscription[] = []; 

  fetchAvailableExercises() {
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any[]) => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            }
          })
        })
      )
      .subscribe(
        (exercises: Exercise[]) => {
         
          this.store.dispatch(new UI.StopLoading);   // payload
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        },
        (error: any) => {
          this.store.dispatch(new UI.StopLoading);
           this.uiService.showErrorSnackbar('Fetching available exercises failed, please try again later', 'Close', 3000);
        }
      ))
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      if (ex) {
        this.addDataToFirebase({
          ...ex,
          date: new Date(), 
          state: 'completed'
        });
        this.store.dispatch(new Training.StopTraining());
      }
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      if (ex) {
        this.addDataToFirebase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          date: new Date(), 
          state: 'cancelled'
        });
        this.store.dispatch(new Training.StopTraining());
      }
    } );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub=> sub.unsubscribe());
  }
  
  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: unknown[]) => {
        this.store.dispatch(new Training.SetFinishedTrainings(exercises as Exercise[]));
    }))
  }

  private addDataToFirebase(exercise: Exercise) {
    if (exercise) {
      this.db.collection('finishedExercises').add(exercise);
    }
  }
}
