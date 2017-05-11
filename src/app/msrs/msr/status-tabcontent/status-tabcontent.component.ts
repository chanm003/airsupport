import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-status-tabcontent',
  templateUrl: './status-tabcontent.component.html',
  styles: []
})
export class StatusTabcontentComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {

  }

}
