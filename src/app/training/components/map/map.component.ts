import {AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoogleMap } from '@angular/google-maps';
import {Run} from '../../models/running.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild('checkbox', { static: false }) myCheckbox;

  @Input() zoom: number;
  @Input() options: google.maps.MapOptions;
  @Input() center: google.maps.LatLngLiteral;
  @Input() markers = [];
  @Input() route;
  @Input() newRunPolylineOptions: google.maps.PolylineOptions;

  @Output() emitRoute = new EventEmitter<Run>();
  @Output() cancelRun = new EventEmitter<any>();
  @Output() addMarkerTest = new EventEmitter<google.maps.MouseEvent>();
  @Output() resetRoute = new EventEmitter<any>();

  addRunForm: FormGroup;
  marker;

  constructor(private fb: FormBuilder) {
  }

  ngAfterViewInit() {
    console.log('myCheckbox', this.myCheckbox);
  }

  ngOnInit() {
    this.buildForm();
    this.locationMarker();
  }

  buildForm() {
    this.addRunForm = this.fb.group ({
      time: ['', Validators.required],
      distance: ['', Validators.required],
      calories: ['', Validators.required],
      route: ['', Validators.required]
    });
  }

  locationMarker() {
    this.marker = new google.maps.Marker ({
      position: {
        lat: this.center.lat,
        lng: this.center.lng
      },
    });
  }

  addMarker(event: google.maps.MouseEvent) {
    this.addMarkerTest.emit(event);
  }

  reset() {
    this.resetRoute.emit();
  }

  cancel() {
    this.cancelRun.emit();
  }

  saveRoute() {
    const run: Run = {
      time: this.addRunForm.value.time,
      distance: this.addRunForm.value.distance,
      calories: this.addRunForm.value.calories,
      route: [...this.route]
    };
    this.emitRoute.emit(run);
    this.reset();
    this.addRunForm.reset();
  }
}
