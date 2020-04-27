import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';


@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit{

  displayedColumns = [
    'date',
    'name',
    'calories',
    'duration',
    'state'
  ];

  // expects to get an array
  dataSource = new MatTableDataSource<Exercise>();
  routes;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedExercises)
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });
    this.trainingService.fetchCompletedOrCanceledExercises();

    // this.store.select(fromTraining.getRoutesRun)
    //   .subscribe((routes => {
    //     this.routes = routes;
    //     console.log(this.routes);
    //   }));
    // this.trainingService.fetchRunningRoutes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(filter: string) {
    // trim removes white space
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }


}
