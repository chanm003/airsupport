import { Component, OnInit, Input } from '@angular/core';
import { NewsfeedItem } from '../shared/newsfeed.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styles: []
})
export class NewsfeedComponent implements OnInit {
  @Input() newsfeeditems: Array<NewsfeedItem>;

  constructor() { }

  ngOnInit() {
  }

}

