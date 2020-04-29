import { Component, OnInit } from '@angular/core';
import * as fromTraining from '../training.reducer';
import { Store} from '@ngrx/store';
import { TrainingService } from '../training.service';
import { Run } from '../running.model';

@Component({
  selector: 'app-past-runs',
  templateUrl: './past-runs.component.html',
  styleUrls: ['./past-runs.component.css']
})
export class PastRunsComponent implements OnInit {

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
  };

  marker;
  selectedRoute: google.maps.LatLngLiteral[] = [];
  polylineOptions: google.maps.PolylineOptions;

  pastRuns: Run[];
  totalDistance: number;
  selectedIndex: number;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.store.select(fromTraining.getRoutesRun)
      .subscribe(((routes: Run[]) => {
        this.pastRuns = [...routes];
        this.calculateDistance();
      }));
    this.trainingService.fetchRunningRoutes();
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.marker = new google.maps.Marker ({
        position: {
          lat: this.center.lat,
          lng: this.center.lng
        },
      });
    });
  }

  calculateDistance() {
    this.totalDistance = this.pastRuns.map(run => run.distance).reduce((a, b) => a + b, 0);
  }

  showRoute(i) {
    if (this.selectedIndex === i){
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

}

