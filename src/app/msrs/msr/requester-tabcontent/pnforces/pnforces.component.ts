import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-pnforces',
  templateUrl: './pnforces.component.html',
  styles: []
})
export class PnforcesComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

  getButtonText() {
    return (this.msr.PNForces.length === 0) ? 'Add a PN Force' : 'Add another PN Force';
  }

  addItem() {
    this.msr.PNForces.push({
      name: '',
      number: 0,
      parachuteType: ''
    });
  }

  removeItem(index){
    this.msr.PNForces.splice(index, 1);
  }

  shouldShow() {
    return Msr.panelsLogic['PNForces'](this.msr);
  }

  showParachuteType() {
    if (this.msr.AirMobilityType === 'Equipment Drop') { return true; }

    if (this.msr.AirMobilityType === 'Infill/Exfill') {
        return _.includes(['MFF', 'Static Line'], this.msr.InfillExfillType);
    }

    return false;
  }

}
