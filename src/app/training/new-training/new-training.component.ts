import { Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {UIService} from '../../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UIService,
              private store: Store<fromTraining.State>) { }


  ngOnInit(): void {
    // Async undefined at the beginning only available once the data has been returned from the server
    // this.availableExercises = this.trainingService.getAvailableExercise();
    // console.log(this.availableExercises);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.availableExercises$ = this.store.select(fromTraining.getAvailableExercises);
    // initialise the fetching of exercises
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercise();
  }

  onStart(form: NgForm) {
    console.log('form', form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }

}
