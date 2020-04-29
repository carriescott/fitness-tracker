import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-run',
  templateUrl: './new-run.component.html',
  styleUrls: ['./new-run.component.css']
})
export class NewRunComponent implements OnInit {

  @Output() showMap: EventEmitter<boolean> = new EventEmitter();

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.showMap.emit(false);
  }

  logRun() {
      this.trainingService.logRun();
    }
}
