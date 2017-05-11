import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import { NewsfeedItem } from '../../shared/newsfeed.model';
import * as _ from 'lodash';
import { NewsfeedService } from '../../shared/newsfeed.service';

@Component({
  selector: 'app-status-tabcontent',
  templateUrl: './status-tabcontent.component.html',
  styles: []
})
export class StatusTabcontentComponent implements OnInit {
  @Input() msr: Msr;
  relatedNewsfeedItems: Array<NewsfeedItem>;

  constructor(private newsfeedService: NewsfeedService) { }

  ngOnInit() {
    this.newsfeedService.getByMsr(this.msr.Id)
      .then((data) => this.relatedNewsfeedItems = data);
  }

}
