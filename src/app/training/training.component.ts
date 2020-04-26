import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TrainingService} from './training.service';
import {Exercise} from './exercise.model';
import {Store} from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  exercise: Exercise;
  showMap: boolean;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    this.showMap = false;
  }

  gotToMap(event) {
    this.showMap = event;
    console.log('event', event);
  }

}
