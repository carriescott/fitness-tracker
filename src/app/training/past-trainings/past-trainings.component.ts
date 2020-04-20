import {AfterViewInit, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = [
    'date',
    'name',
    'calories',
    'duration',
    'state'
  ];

  // expects to get an array
  dataSource = new MatTableDataSource<Exercise>();
  private finishedExerciseSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.finishedExerciseSubscription = this.trainingService.finishedExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        console.log('exercises', exercises);
        this.dataSource.data = exercises;
      });
    this.trainingService.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(filter: string) {
    // trim removes white space
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }

  ngOnDestroy(): void {
    this.finishedExerciseSubscription.unsubscribe();
  }

}
