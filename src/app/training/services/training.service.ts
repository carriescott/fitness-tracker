import { Exercise } from '../models/exercise.model';
import { Run } from '../models/running.model';
import { Injectable} from '@angular/core';
import { Subject} from 'rxjs';
import {map, take} from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as UI from '../../shared/ui.actions';
import * as Training from '../training.actions';

@Injectable()
export class TrainingService {

  exercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  private addRunDataToDatabase(run: Run) {
    this.db.collection('completedRuns').add(run);
  }

  constructor(private db: AngularFirestore,
              private uiService: UIService,
              private store: Store<fromTraining.State>) {
  }

  fetchAvailableExercise() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docData => {
          // throw(new Error());
          return docData.map(doc => {
            const object = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              // @ts-ignore
              name: object.name,
              // @ts-ignore
              duration: object.duration,
              // @ts-ignore
              calories: object.calories
            };
          });
        }))
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          }, error => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar('Fetching  Exercises failed, please try again later', null, 3000);
          this.exercisesChanged.next(null);
        }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  logRun() {
    this.store.dispatch(new Training.StartRun());
  }

  stopLoggingRun() {
    this.store.dispatch(new Training.StopRun());
  }

  addRun(run) {
    this.addRunDataToDatabase(
      {
        ...run,
        date: new Date(),
        state: 'completed'
      });
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase(
        {
          ...exercise,
          date: new Date(),
          state: 'completed'
        });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase(
        {
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.duration * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchCompletedOrCanceledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));
          }
        )
    );
  }

  fetchRunningRoutes() {
    this.fbSubs.push(
      this.db
        .collection('completedRuns')
        .valueChanges()
        .subscribe((runs: Run[]) => {
          this.store.dispatch(new Training.SetRoutesRun(runs));
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

}
