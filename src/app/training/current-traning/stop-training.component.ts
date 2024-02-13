import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-stop-training',
  template: `
    <section class="dialog">
      <h1 matdialog-title>Are you sure?</h1>
      <mat-dialog-content>
        You already got {{ passedData.progress }}%
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="true">Yes</button>
        <button mat-button [mat-dialog-close]="false">No</button>
      </mat-dialog-actions>
    </section>
  `,
  styleUrls: ["./current-traning.component.css"]  
})

export class StopTrainingComponent {
  // MAT_DIALOG_DATA  is a special token that Angular uses to inject data into the dialog component.
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
};