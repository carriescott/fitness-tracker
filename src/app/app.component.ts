import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('sidenav')
  // onToggle() {
  // }

  title = 'fitness-tracker';
  openSidenav = false;

  links: [
    {
      name: 'Signup',
      link: '/signup',
      icon: 'face'
    },
    {
      name: 'Login',
      link: '/login',
      icon: 'face'
    },
    {
      name: 'Training',
      link: '/training',
      icon: 'face'
    }
  ];
}
