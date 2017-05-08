import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-dropzones',
  templateUrl: './dropzones.component.html',
  styles: []
})
export class DropzonesComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

  getButtonText() {
    return (this.msr.DropZones.length === 0) ? 'Add a Drop Zone' : 'Add another Drop Zone';
  }

  addItem() {
    this.msr.DropZones.push({
      name: '',
      surveyRequired: false
    });
  }

  removeItem(index){
    this.msr.DropZones.splice(index, 1);
  }

  shouldShow() {
    if (this.msr.OperationType === 'AIR Mobility (SAM)') {
      if (this.msr.AirMobilityType === "Infill/Exfill") {
        return _.includes(['MFF', 'Static Line'], this.msr.InfillExfillType);
      }
    }
    return false;
  }

}
