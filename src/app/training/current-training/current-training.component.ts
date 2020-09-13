import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile, repeat, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PauseDialogComponent } from './pause-dialog/pause-dialog.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  stopped = false;
  buttonText = 'Stop';
  progress = 0;
  subscription: Subscription;
  exercise: Exercise;

  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exercise = this.trainingService.activeExercise;
    const steps = this.exercise.duration * 1000 / 250;
    const stepPart = 100 / steps;

    this.subscription = interval(250).pipe(
      takeWhile(() => !this.stopped),
      tap(() => {
        if (this.progress >= 100) {
          this.stopped = true;
          this.progress = 100;
          this.buttonText = 'Repeat';
          this.trainingService.completeExercise();
        }
      }),
      repeat()
    ).subscribe(() => this.progress += stepPart);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pausePlayDialog() {
    const dialogRef = this.dialog.open(PauseDialogComponent, {
      width: '250px',
      data: {progress: this.progress / 100}
    });

    // stop while dialog is displayed
    this.stopped = true;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        // go on
        this.stopped = false;
      }
    });
  }
}
