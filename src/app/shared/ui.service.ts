import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();
  
  constructor(private snackBar: MatSnackBar) {}

  showErrorSnackbar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration, // Duration in milliseconds
      horizontalPosition: 'center', // Positioning
      verticalPosition: 'bottom',
    });
  }
}
