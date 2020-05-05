import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TrainingService} from '../../services/training.service';
import {Exercise} from '../../models/exercise.model';
import {Store} from '@ngrx/store';
import * as fromTraining from '../../training.reducer';
import {Run} from '../../models/running.model';
import * as fromRoot from '../../../app.reducer';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  loggingRun$: Observable<boolean>;
  availableExercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  exercise: Exercise;
  pastRuns: Run[];
  totalDistance: number;
  center: google.maps.LatLngLiteral;

  selectedRoute: google.maps.LatLngLiteral[] = [];
  polylineOptions: google.maps.PolylineOptions;
  selectedIndex: number;

  dataSource = new MatTableDataSource<Exercise>();

  markers = [];
  route = [];
  newRunPolylineOptions: google.maps.PolylineOptions;

  displayedColumns = [
    'date',
    'name',
    'calories',
    'duration',
    'state'
  ];

  zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
  };

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {
    this.setUserLocation();
  }

  ngOnInit(): void {

    this.store.select(fromTraining.getFinishedExercises)
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });

    this.store.select(fromTraining.getRoutesRun)
      .subscribe(((routes: Run[]) => {
        this.pastRuns = [...routes];
        this.calculateDistance();
      }));

    this.trainingService.fetchCompletedOrCanceledExercises();
    this.trainingService.fetchAvailableExercise();
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    this.loggingRun$ = this.store.select(fromTraining.IsLoggingRun);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.availableExercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.trainingService.fetchRunningRoutes();
  }

  calculateDistance() {
    this.totalDistance = this.pastRuns.map(run => run.distance).reduce((a, b) => a + b, 0);
  }

  setUserLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
  }

  showRoute(i) {
    if (this.selectedIndex === i) {
      this.hideRoute();
    } else {
      this.selectedIndex = i;
      this.selectedRoute = [];
      this.selectedRoute = this.pastRuns[this.selectedIndex].route;
      this.polylineOptions = {path: this.selectedRoute, strokeColor: 'blue', strokeOpacity: 1};
    }
  }

  hideRoute() {
    this.selectedIndex = null;
    this.selectedRoute = [];
    this.polylineOptions = {path: this.selectedRoute, strokeColor: 'blue', strokeOpacity: 1};
  }

  saveRoute(run) {
    this.trainingService.addRun(run);
    this.trainingService.stopLoggingRun();
  }

  cancelRun() {
    this.trainingService.stopLoggingRun();
    this.resetRoute();
  }

  addMarker(event: google.maps.MouseEvent) {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    const marker = new google.maps.Marker ({
      position: {
        lat: latitude,
        lng: longitude
      }
    });
    const routeObject = {
      lat: latitude,
      lng: longitude
    };
    this.markers.push(marker);
    this.route.push(routeObject);
    this.newRunPolylineOptions = {path: this.route, strokeColor: 'pink', strokeOpacity: 1};
  }

  resetRoute() {
    this.markers = [];
    this.route = [];
    this.newRunPolylineOptions = {path: this.route, strokeColor: 'pink', strokeOpacity: 1};
  }

  logRun(){
    this.trainingService.logRun();
  }

  startNewTraining(form) {
    console.log('form', form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercisesFromDB() {
    this.trainingService.fetchAvailableExercise();
  }

  filterDataSource(filter) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
}
