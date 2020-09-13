import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pause-dialog',
  templateUrl: './pause-dialog.component.html',
  styleUrls: ['./pause-dialog.component.scss']
})
export class PauseDialogComponent {
  progress: number;

  constructor(
    public dialogRef: MatDialogRef<PauseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.progress = data.progress;
    }
}
