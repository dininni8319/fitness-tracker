import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class TrainingService {
  private exerciseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];

  fetchAvailableExercises() {
    const exerciseSubscription = this.db
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
          console.log(exercises);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        (error: any) => {
          console.error('Error fetching available exercises:', error);
          // Handle the error appropriately (e.g., show an error message to the user)
        }
      );

    this.exerciseSubscriptions.push(exerciseSubscription);
  }

  startExercise(selectedId: string) {

    const selectedExercise = this.availableExercises.find(el => {
      console.log(el, selectedId);
      
      return el.id === selectedId;
    
    });
    
    if (selectedExercise) {
      this.runningExercise = selectedExercise; 
      this.exerciseChanged.next({...this.runningExercise});
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise, 
        date: new Date(), 
        state: 'completed'
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null); 
    }
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(), 
        state: 'cancelled'
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null); 
    }
  }

  getRunningExercise() {
    return {...this.runningExercise}; // Return a copy of the object to prevent modifications
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }

  ngOnDestroy() {
    this.exerciseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
