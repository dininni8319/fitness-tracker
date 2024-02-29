import { 
  Component, 
  EventEmitter, 
  Output, 
  OnInit 
} from '@angular/core';
import { TrainingService } from '../traning.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-traning.component.html',
  styleUrls: ['./new-traning.component.css']
})

export class NewTraningComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private traningService: TrainingService) {};
  @Output() trainingStart = new EventEmitter<void>();

  onStartTraining(form: NgForm) {
    this.traningService.startExercise(form.value.exercise); // passing to the service
  }
  
  ngOnInit(): void {
    this.exercises  = this.traningService.getAvailableExercises();
  }
}
