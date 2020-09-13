import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Exercise } from './exercise.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private _myExercises: Exercise[] = [];
  myExercises$ = new BehaviorSubject<Exercise[]>([]);

  private _activeExercise: Exercise;
  public get activeExercise(): Exercise {
    return {
      ...this._activeExercise // immutable
    };
  }

  private _trainingNow$ = new BehaviorSubject<boolean>(false);
  public get trainingNow$(): Observable<boolean> {
    return this._trainingNow$;
  }

  constructor(private router: Router) { }

  public getAllExercises() {
    return this.availableExercises.map(ex => ({...ex})); // immutable
  }
  public getPastExercises(): Observable<Exercise[]> {
    return this.myExercises$;
  }

  public startExercise(id: string) {
    this._trainingNow$.next(true);
    this._activeExercise = this.availableExercises.find(ex => ex.id === id);
  }

  private _finishExercise() {
    this._trainingNow$.next(false);
    this._activeExercise = null;
  }

  public cancelExercise(progress: number) {
    this._myExercises.push({
      ...this._activeExercise,
      duration: this._activeExercise.duration * progress / 100,
      calories: this._activeExercise.calories * progress / 100,
      date: new Date(),
      state: 'cancelled'
    });
    this.myExercises$.next(this._myExercises.slice());
    this._finishExercise();
  }

  public completeExercise() {
    this._finishExercise();
    this._myExercises.push({
      ...this._activeExercise,
      date: new Date(),
      state: 'completed'
    });
  }

}
