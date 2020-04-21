import {NgModule} from '@angular/core';
import {TrainingComponent} from './training.component';
import {AuthGuard} from '../auth/auth.guard';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
  // providers: [AuthGuard]
})
export class TrainingRoutingModule {}
