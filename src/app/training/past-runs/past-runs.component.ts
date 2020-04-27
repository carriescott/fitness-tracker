import { Component, OnInit } from '@angular/core';
import * as fromTraining from '../training.reducer';
import { Store} from '@ngrx/store';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-past-runs',
  templateUrl: './past-runs.component.html',
  styleUrls: ['./past-runs.component.css']
})
export class PastRunsComponent implements OnInit {

  routes;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.store.select(fromTraining.getRoutesRun)
      .subscribe((routes => {
        this.routes = routes;
        console.log(this.routes);
      }));
    this.trainingService.fetchRunningRoutes();
  }


}
