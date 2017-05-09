import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-subunits',
  templateUrl: './subunits.component.html',
  styles: []
})
export class SubunitsComponent implements OnInit {
  @Input() msr: Msr;
  @Input() dataEntryLookups: any;
  assignedSupportUnit: any;
  constructor() { }

  ngOnInit() {
    this.setSubunitsDataSource();
  }

  setSubunitsDataSource() {
    const match = _.find(this.dataEntryLookups.supportUnits, {Id: this.msr.SupportUnitId});
    if (match) {
      this.assignedSupportUnit = match;
    }
  }

  getButtonText() {
    return (this.msr.AssignedSubunits.length === 0) ? 'Add a Subunit' : 'Add another Subunit';
  }

  addItem() {
    this.msr.AssignedSubunits.push({
      subunitId: null,
      platforms: []
    });
  }

  removeItem(index){
    this.msr.AssignedSubunits.splice(index, 1);
  }

  addSubitem(platforms) {
    platforms.push({
      type: '',
      quantity: 0
    });
  }

  removeSubitem(platforms, index) {
    platforms.splice(index, 1);
  }
}
