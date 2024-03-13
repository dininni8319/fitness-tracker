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
import { Observable, Subscription } from 'rxjs';

@Injectable()
@Component({
  selector: 'app-new-training',
  templateUrl: './new-traning.component.html',
  styleUrls: ['./new-traning.component.css']
})

export class NewTraningComponent implements OnInit, OnDestroy {
  exercises!:Exercise[] | null;
  exerciseSubscription: Subscription = new Subscription();

  constructor(private traningService: TrainingService) {};

  @Output() trainingStart = new EventEmitter<void>();

  onStartTraining(form: NgForm) {
    console.log(form.value.exercise);
    
    this.traningService.startExercise(form.value.exercise); // passing to the service
  }
  
  ngOnInit(): void { 
    //  get the data from firestore db     
    //valueChanges give us an observable
    this.exerciseSubscription = this.traningService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
      this.traningService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
