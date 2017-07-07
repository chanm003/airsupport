import { Component, OnInit, Input } from '@angular/core';
import { StatusChange } from '../../shared/newsfeed.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styles: []
})
export class StatusChangeComponent implements OnInit {
  @Input() newsfeeditem: StatusChange;
  constructor() { }

  ngOnInit() {
  }
}
