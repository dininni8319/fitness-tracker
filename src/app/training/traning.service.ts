import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class TrainingService {
  private exerciseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}
  fineshedExercisesChanged = new Subject<Exercise[] | null>();
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];
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
          console.log(exercises);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        (error: any) => {
          // console.error('Error fetching available exercises:', error);
          // Handle the error appropriately (e.g., show an error message to the user)
        }
      ))
  }

  startExercise(selectedId: string) {
    // use doc to get the id of the document in the collection
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    const selectedExercise = this.availableExercises.find(el => {
      return el.id === selectedId;
    });
    
    if (selectedExercise) {
      this.runningExercise = selectedExercise; 
      this.exerciseChanged.next({...this.runningExercise});
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.addDataToFirebase({
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
      this.addDataToFirebase({
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

  cancelSubscriptions() {
    this.fbSubs.forEach(sub=> sub.unsubscribe());
  }
  
  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe(exercises => {
      this.fineshedExercisesChanged.next(exercises as Exercise[]);
    }))
  }

  ngOnDestroy() {
    this.exerciseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToFirebase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
