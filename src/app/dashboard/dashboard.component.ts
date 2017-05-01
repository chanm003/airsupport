import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  favoriteWebsite = null;
  mostHatedWebsite = { url: 'www.foxnews.com', name: 'Fox News' };

  websites: any[] = [
    { url: 'www.google.com', name: 'Google' },
    { url: 'www.facebook.com', name: 'Facebook' },
    { url: 'www.amazon.com', name: 'Amazon' }
  ];
  constructor( ) { }

}
