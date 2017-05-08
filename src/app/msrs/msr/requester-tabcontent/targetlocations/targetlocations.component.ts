import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-targetlocations',
  templateUrl: './targetlocations.component.html',
  styles: []
})
export class TargetlocationsComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

  getButtonText() {
    return (this.msr.TargetLocations.length === 0) ? 'Add a Target Location' : 'Add another Target Location';
  }

  addItem() {
    this.msr.TargetLocations.push({
      name: '',
      coordinates: '',
      accessPOC: ''
    });
  }

  removeItem(index) {
    this.msr.TargetLocations.splice(index, 1);
  }

  shouldShow() {
    if (this.msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)') { return true; }
    if (this.msr.OperationType === 'AIR Mobility (SAM)') {
      if (this.msr.AirMobilityType === 'Infill/Exfill') {
        return this.msr.InfillExfillType === 'AIEs';
      }
    }
    return false;
  }

  showAccessPOC() {
    return this.msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)';
  }
}

