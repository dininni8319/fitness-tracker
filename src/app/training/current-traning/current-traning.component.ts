import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-traning',
  templateUrl: './current-traning.component.html',
  styleUrls: ['./current-traning.component.css']
})

export class CurrentTraningComponent implements OnInit {
  progress = 0;
  intervalId = null;

  ngOnInit(): void {
    this.startProgress()
  }

  startProgress() {
    if (this.progress !== 100) {
      setInterval(() => {
        ++this.progress
        console.log('progress: ',this.progress);
        
      }, 1000);

      if (this.progress === 100) {
        this.clearProgress()
      }
    }
  }

  clearProgress() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
