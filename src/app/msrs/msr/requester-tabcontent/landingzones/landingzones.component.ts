import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-landingzones',
  templateUrl: './landingzones.component.html',
  styles: []
})
export class LandingzonesComponent implements OnInit {
   @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

  getButtonText() {
    return (this.msr.LandingZones.length === 0) ? 'Add a Landing Zone' : 'Add another Landing Zone';
  }

  addItem() {
    this.msr.LandingZones.push({
      name: '',
      surveyRequired: false
    });
  }

  removeItem(index) {
    this.msr.LandingZones.splice(index, 1);
  }

  shouldShow() {
    return Msr.panelsLogic['LandingZones'](this.msr);
  }

}
