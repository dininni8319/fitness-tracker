import { Component, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../traning.service';

@Component({
  selector: 'app-current-traning',
  templateUrl: './current-traning.component.html',
  styleUrls: ['./current-traning.component.css']
})

export class CurrentTraningComponent implements OnInit {
  progress = 0;
  timer: number = 0;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const runningExercise = this.trainingService.getRunningExercise();
    if (runningExercise.duration) {
      const step = runningExercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 20;
        console.log("🚀 ~ CurrentTraningComponent ~ this.timer=setInterval ~ progress:", this.progress)

        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }

      }, step);
    }
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startOrResumeTimer();
      }
      
    })
  }
}
