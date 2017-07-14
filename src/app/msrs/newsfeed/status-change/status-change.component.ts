import { Component, OnInit, Input } from '@angular/core';
import { StatusChange } from '../../shared/newsfeed.model';
import * as _ from 'lodash';
import { CacheddataService } from '../../../core/cacheddata.service';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styles: []
})
export class StatusChangeComponent implements OnInit {
  @Input() newsfeeditem: StatusChange;
  statusColor: any;
  constructor(private cacheddataService: CacheddataService) { }

  ngOnInit() {
    this.cacheddataService.getAll()
      .then((data: any) => this.statusColor = (<any>_.find(data.statuses, {text: this.newsfeeditem.JSON.newStatus})).color);
  }
}
