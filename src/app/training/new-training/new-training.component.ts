import { Component, OnInit, OnDestroy} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import {UIService} from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UIService) { }


  ngOnInit(): void {
    // Async undefined at the beginning only available once the data has been returned from the server
    // this.availableExercises = this.trainingService.getAvailableExercise();
    // console.log(this.availableExercises);
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        (this.availableExercises = exercises);
      }
    );
    // initialise the fetching of exercises
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercise();
  }


  onStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
