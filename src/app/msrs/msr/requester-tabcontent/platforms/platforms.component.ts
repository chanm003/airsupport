import { Component, OnInit, Input } from '@angular/core';
import { Msr, PNForce } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styles: []
})
export class PlatformsComponent implements OnInit {
  @Input() msr: Msr;

  constructor() { }

  ngOnInit() {
  }

  getButtonText() {
    return (this.msr.Platforms.length === 0) ? 'Add a Platform' : 'Add another Platform';
  }

  addItem() {
    this.msr.Platforms.push({
      type: '',
      quantity: 0
    });
  }

  removeItem(index) {
    this.msr.Platforms.splice(index, 1);
  }

  shouldShow() {
    return this.msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)';
  }

}
