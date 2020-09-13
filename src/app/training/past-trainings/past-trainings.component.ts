import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit {

  exerciseData$: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseData$ = this.trainingService.getPastExercises();
  }

}
