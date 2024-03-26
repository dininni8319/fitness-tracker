import { 
  Component, 
  EventEmitter, 
  Output, 
  OnInit, 
  Injectable,
} from '@angular/core';
import { TrainingService } from '../traning.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs'

@Injectable()
@Component({
  selector: 'app-new-training',
  templateUrl: './new-traning.component.html',
  styleUrls: ['./new-traning.component.css']
})

export class NewTraningComponent implements OnInit {
  exercises$!: Observable<Exercise[] | null>;
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private traningService: TrainingService,
    private store: Store<fromTraining.State>
  ) {};

  @Output() trainingStart = new EventEmitter<void>();

  onStartTraining(form: NgForm) {
    this.traningService.startExercise(form.value.exercise); // passing to the service
  }
  
  ngOnInit(): void { 
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
   
    this.fetchExercises();
  }

  fetchExercises() {
    this.traningService.fetchAvailableExercises();
  }
}
