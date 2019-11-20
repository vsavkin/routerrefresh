import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'routerrefresh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  refresh() {
    this.router.navigateByUrl('/parent/child');
  }
}
