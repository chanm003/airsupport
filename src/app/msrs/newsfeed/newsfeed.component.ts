import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styles: []
})
export class NewsfeedComponent implements OnInit {
  @Input() msr: Msr;
  constructor() { }

  ngOnInit() {
  }

}

