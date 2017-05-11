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

  setClasses(status) {
    const classes = {
      'badge-primary': _.includes(['Submitted', 'Vetting', 'Assigned', 'Planning'], status),
      'badge-success': status === 'Approved',
      'badge-warning': status === 'Draft',
      'badge-danger': _.includes(['Canceled', 'Rejected'], status)
    };
    return classes;
  }
}
