import {Exercise} from './exercise.model';
import { Subject} from 'rxjs';

export class TrainingService {

  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    {
      id: 'crunches',
      name: 'Crunches',
      duration: 30,
      calories: 8
    },
    {
      id: 'touch-toes',
      name: 'Touch Toes',
      duration: 180,
      calories: 15
    },
    {
      id: 'side-lunges',
      name: 'Side Lunges',
      duration: 120,
      calories: 18
    },
    {
      id: 'kettle-bell-swings',
      name: 'Kettle Bell Swings',
      duration: 60,
      calories: 24
    }
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercise() {
    return this.availableExercises.slice();
    // return [...this.availableExercises];
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(exercise => exercise.id === selectedId );
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      }
      );
    console.log(this.exercises);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }


  cancelExercise(progress: number) {
    this.exercises.push(
      {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.duration * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      }
    );
    console.log(this.exercises);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  getCompletedOrCanceledExercises() {
    console.log('getExercises', this.exercises);
    // return {...this.exercises};
    return this.exercises.slice();
    // return this.exercises;
  }


}
