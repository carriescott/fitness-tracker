import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-new-run',
  templateUrl: './new-run.component.html',
  styleUrls: ['./new-run.component.css']
})
export class NewRunComponent implements OnInit {


  @Output() showMap: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.showMap.emit(false);
  }

  goToMap() {
    this.showMap.emit(true);
  }
}
