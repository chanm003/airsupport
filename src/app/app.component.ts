import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<simple-notifications [options]="options"></simple-notifications><router-outlet></router-outlet><app-story-spinner></app-story-spinner>'
})
export class AppComponent {
  public options = {
      position: ['top', 'right'],
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      timeOut: 3000
  };
}
