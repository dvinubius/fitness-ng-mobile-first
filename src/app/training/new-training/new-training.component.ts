import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  chops: Exercise[];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.chops = this.trainingService.getAllExercises();
  }

  started(exerciseId: string) {
    this.trainingService.startExercise(exerciseId);
  }

}
