import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-support-tabcontent',
  templateUrl: './support-tabcontent.component.html',
  styles: []
})
export class SupportTabcontentComponent implements OnInit {
  @Input() msr: Msr;
  @Input() cachedData: any;
  @Output() saveButtonClicked = new EventEmitter<string>();
  assignedSupportUnit: any;
  constructor() {
  }

  ngOnInit() {
    this.setSubunitsDataSource();
  }

  setSubunitsDataSource() {
    const match = _.find(this.cachedData.supportUnits, {Id: this.msr.SupportUnitId});
    if (match) {
      this.assignedSupportUnit = match;
    }
  }

  onSaveButtonClicked(): void {
    this.saveButtonClicked.emit();
  }

  convertToDate(dt: NgbDateStruct) {
    if (dt) {
      return new Date(dt.year, dt.month - 1, dt.day);
    } else {
      return null;
    }
  }

  getMaximumDateForMissionSupportStart() {
    const mse = this.convertToDate(this.msr.MissionSupportEnd);
    const ms = this.convertToDate(this.msr.MissionStart);
    const me = this.convertToDate(this.msr.MissionEnd);

    if (ms <= mse && mse <= me) {
      return this.msr.MissionSupportEnd;
    } else {
      return this.msr.MissionEnd;
    }
  }

  getMinimumDateForMissionSupportEnd() {
    const mss = this.convertToDate(this.msr.MissionSupportStart);
    const ms = this.convertToDate(this.msr.MissionStart);
    const me = this.convertToDate(this.msr.MissionEnd);

    if (ms <= mss && mss <= me) {
      return this.msr.MissionSupportStart;
    } else {
      return this.msr.MissionStart;
    }
  }
}


