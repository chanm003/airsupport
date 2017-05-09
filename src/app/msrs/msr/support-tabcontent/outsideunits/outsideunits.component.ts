import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-outsideunits',
  templateUrl: './outsideunits.component.html',
  styles: []
})
export class OutsideunitsComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

  getButtonText() {
    return (this.msr.AssignedOutsideUnits.length === 0) ? 'Add an Outside Unit' : 'Add another Outside Unit';
  }

  addItem() {
    this.msr.AssignedOutsideUnits.push({
      name: '',
      pocName: '',
      pocPhone: '',
      pocEmail: '',
      platforms: []
    });
  }

  removeItem(index){
    this.msr.AssignedOutsideUnits.splice(index, 1);
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
