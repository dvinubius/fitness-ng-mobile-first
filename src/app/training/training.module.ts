import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './past-trainings/table/table.component';
import { PauseDialogComponent } from './current-training/pause-dialog/pause-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    TableComponent,
    PauseDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TrainingRoutingModule
  ],
  exports: [
    TrainingComponent,
  ],
  entryComponents: [
    PauseDialogComponent
  ],
})
export class TrainingModule { }
