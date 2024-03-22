import { 
  Component, 
  EventEmitter, 
  Output, 
  OnInit, 
  Injectable,
  OnDestroy
} from '@angular/core';
import { TrainingService } from '../traning.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { Observable } from 'rxjs'

@Injectable()
@Component({
  selector: 'app-new-training',
  templateUrl: './new-traning.component.html',
  styleUrls: ['./new-traning.component.css']
})

export class NewTraningComponent implements OnInit, OnDestroy {
  exercises!:Exercise[] | null;
  exerciseSubscription: Subscription = new Subscription();
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private traningService: TrainingService,
    private store: Store<{ui: fromRoot.State}>
  ) {};

  @Output() trainingStart = new EventEmitter<void>();

  onStartTraining(form: NgForm) {
    console.log(form.value.exercise);
    
    this.traningService.startExercise(form.value.exercise); // passing to the service
  }
  
  ngOnInit(): void { 
    // get the data from firestore db     
    //valueChanges give us an observable
    this.exerciseSubscription = this.traningService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises
      }
      );
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    console.log('====================================');
    console.log(this.isLoading$);
    console.log('====================================');
    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  fetchExercises() {
    this.traningService.fetchAvailableExercises();
  }
}
