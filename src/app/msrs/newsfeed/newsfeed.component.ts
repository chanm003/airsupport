import { Component, OnInit, Input } from '@angular/core';
import { NewsfeedItem } from '../shared/newsfeed.model';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styles: []
})
export class NewsfeedComponent implements OnInit {
  @Input() newsfeeditems: Array<NewsfeedItem>;

  constructor() { }

  ngOnInit() {}

  getTimestamp(dt) {
    return moment(dt).fromNow();
  }

}

