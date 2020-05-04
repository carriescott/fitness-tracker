import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Input() isLoading$;
  @Input() availableExercises$;
  @Output() submitForm = new EventEmitter<NgForm>();
  @Output() fetchAvailableExercises = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
  }

  fetchExercises() {
    this.fetchAvailableExercises.emit();
  }

  onStart(form: NgForm) {
    this.submitForm.emit(form);
  }

}
