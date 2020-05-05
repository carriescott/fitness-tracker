import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Run } from '../../models/running.model';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-past-runs',
  templateUrl: './past-runs.component.html',
  styleUrls: ['./past-runs.component.css']
})
export class PastRunsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Input() pastRuns: Run[];
  @Input() totalDistance: number;
  @Input() options;
  @Input() zoom;
  @Input() selectedRoute;
  @Input() polylineOptions;
  @Input() center;
  @Output() showRouteIndex = new EventEmitter<void>();

  marker: any;

  constructor() {}

  ngOnInit(): void {
    this.marker = new google.maps.Marker ({
      position: {
        lat: this.center.lat,
        lng: this.center.lng
      },
    });
  }

  showRoute(i) {
    this.showRouteIndex.emit(i);
  }

}

