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
  assignedSupportUnit: any;
  constructor() {
  }

  ngOnInit() {
    this.setSubunitsDataSource();
  }

  setSubunitsDataSource() {
    const match = _.find(this.dataEntryLookups.supportUnits, {Id: this.msr.SupportUnitId});
    if (match) {
      this.assignedSupportUnit = match;
    }
  }

  onSaveButtonClicked(): void {
    this.saveButtonClicked.emit('owner');
  }
}


