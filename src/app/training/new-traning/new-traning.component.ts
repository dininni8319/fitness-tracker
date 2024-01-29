import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-traning.component.html',
  styleUrls: ['./new-traning.component.css']
})

export class NewTraningComponent {

  @Output() trainingStart = new EventEmitter<void>();

  onStartTraining() {
    this.trainingStart.emit();
  }
}
