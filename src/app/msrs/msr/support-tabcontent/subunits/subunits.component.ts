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
  @Input() cachedData: any;
  @Input() assignedSupportUnit: any;
  constructor() { }

  ngOnInit() {
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
