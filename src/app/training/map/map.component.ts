import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainingService} from '../training.service';
import {Run} from '../running.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  addRunForm: FormGroup;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
  };

  markers = [];
  marker;
  route: google.maps.LatLngLiteral[] = [];
  polylineOptions: google.maps.PolylineOptions = {};

  constructor(private fb: FormBuilder,
              private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.addRunForm = this.fb.group ({
      name: [''],
      time: ['', Validators.required],
      distance: ['', Validators.required],
      calories: ['', Validators.required],
    });
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.marker = {
        position: {
          lat: this.center.lat,
          lng: this.center.lng
        },
      };
    });
  }

  addMarker(event: google.maps.MouseEvent) {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    const markerObject = {
      position: {
        lat: latitude,
        lng: longitude
      }
    };
    const routeObject = {
      lat: latitude,
      lng: longitude
    };
    this.markers.push(markerObject);
    this.route.push(routeObject);
    this.polylineOptions = {path: this.route, strokeColor: 'blue', strokeOpacity: 1};
  }

  reset() {
    this.markers = [];
    this.route = [];
    this.polylineOptions = {path: this.route, strokeColor: 'blue', strokeOpacity: 1};
  }

  saveRoute() {
    const run: Run = {
      time: this.addRunForm.value.time,
      distance: this.addRunForm.value.distance,
      calories: this.addRunForm.value.calories,
      route: [...this.route]
    };
    this.trainingService.addRun(run);
  }

  fetchRunningRoutes() {
    this.trainingService.fetchRunningRoutes();
  }
}
