import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-owner-tabcontent',
  templateUrl: './owner-tabcontent.component.html',
  styles: []
})
export class OwnerTabcontentComponent implements OnInit {
  @Input() msr: Msr;
  @Input() dataEntryLookups: any;
  @Output() saveButtonClicked = new EventEmitter<string>();

  checkboxDataSource: Array<any>;
  constructor() {
   }

  ngOnInit() {
    this.buildCheckboxDataSource();
  }

  buildCheckboxDataSource() {
    this.checkboxDataSource = _.map(this.dataEntryLookups['owningUnits'], (opt: any) => {
      return {
        value: opt.Id,
        display: opt.Name,
        isChecked: _.includes(this.msr.OwningUnitsId, opt.Id)
      };
    });
  }

  onCheckboxClicked() {
    this.msr.OwningUnitsId = _.map(_.filter(this.checkboxDataSource, {isChecked: true}), 'value');
  }

  onSaveButtonClicked(): void {
    this.saveButtonClicked.emit('owner');
  }
}


