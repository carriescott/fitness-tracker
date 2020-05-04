import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-new-run',
  templateUrl: './new-run.component.html',
  styleUrls: ['./new-run.component.css']
})
export class NewRunComponent implements OnInit {

  @Output() startLoggingRun: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  logRun() {
    this.startLoggingRun.emit();
    }
}
