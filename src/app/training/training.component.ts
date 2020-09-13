import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  trainingNow$: Observable<boolean>;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingNow$ = this.trainingService.trainingNow$;
  }
}
