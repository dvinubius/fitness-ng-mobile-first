import { TrainingComponent } from './training.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const trainingRoutes = [
  { path: '', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(trainingRoutes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
