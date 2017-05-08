import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styles: []
})
export class VehiclesComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

  getButtonText() {
    return (this.msr.Vehicles.length === 0) ? 'Add a Vehicle' : 'Add another Vehicle';
  }

  addItem() {
    this.msr.Vehicles.push({
      type: '',
      quantity: 0
    });
  }

  removeItem(index) {
    this.msr.Vehicles.splice(index, 1);
  }

  shouldShow() {
    if (this.msr.OperationType === 'AIR Mobility (SAM)') {
      if (this.msr.AirMobilityType === 'Infill/Exfill') {
        return this.msr.InfillExfillType === 'RAPIDS' && this.msr.VehiclesRequired;
      }
    }
    return false;
  }

}
