import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-support-tabcontent',
  templateUrl: './support-tabcontent.component.html',
  styles: []
})
export class SupportTabcontentComponent implements OnInit {
  @Input() msr: Msr;
  @Input() dataEntryLookups: any;
  @Output() saveButtonClicked = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onSaveButtonClicked(): void {
    this.saveButtonClicked.emit('owner');
  }
}


