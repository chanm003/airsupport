import { Component, OnInit } from '@angular/core';
import { MsrService } from '../shared/msr.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import * as moment from 'moment';
import {SelectItem} from 'primeng/primeng';
import { CacheddataService } from '../../core/cacheddata.service';
import { PagecontextService } from '../../core/pagecontext.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-msr-list',
  templateUrl: './msr-list.component.html',
  styles: []
})
export class MsrListComponent implements OnInit {
  msrFiltered: Array<any>;
  msrList: Array<any>;
  lookups: any;
  filterControls = {
    requestingUnits: {
      selectable: [],
      selected: []
    },
    statuses: {
      selectable: [],
      selected: []
    },
    supportUnits: {
      selectable: [],
      selected: []
    }
  }

  constructor(private msrService: MsrService, private cacheddataService: CacheddataService, private spinnerService: SpinnerService,
    private pagecontextService: PagecontextService, private router: Router) {
  }

  decorateWithMetadata(item) {
    item.MissionStart_Military = moment(item.MissionStart).format('DD MMM YY').toUpperCase();
    item.MissionEnd_Military = moment(item.MissionEnd).format('DD MMM YY').toUpperCase();
    item.SupportUnitName = (item.SupportUnit && item.SupportUnit.Name) ? item.SupportUnit.Name : '';
    item.RequestingUnitName = item.RequestingUnit.Name;
    const mission = JSON.parse(item.RelatedMission);
    item.MissionName = mission.Title;
    item.StatusClass = (<any>_.find(this.lookups.statuses, {text: item.Status})).bootstrapBadge;
    item.StatusSortOrder = _.findIndex(this.lookups.statuses, {text: item.Status});
  }

  initializeFilterControls() {
    this.filterControls.requestingUnits.selectable =
      _.map(this.lookups.requestingUnits, (item: any) => {
        return {
          label: item.Name,
          value: item.Id
        };
      });

    this.filterControls.statuses.selectable =
      _.map(this.lookups.statuses, (item: any) => {
        return {
          label: item.text,
          value: item.text
        };
      });

    this.filterControls.supportUnits.selectable =
      _.map(this.lookups.supportUnits, (item: any) => {
        return {
          label: item.Name,
          value: item.Id
        };
      });
    return Promise.resolve(null);
  }

  goToMsr(msr) {
    this.spinnerService.show();
    this.router.navigate([`/msrs/${msr.Id}`])
      .then(() => this.spinnerService.hide());
  }

  ngOnInit() {
    this.spinnerService.show();
    this.cacheddataService.getAll()
      .then(data => {
        this.lookups = data;
        this.initializeFilterControls();
      })
      .then(() => this.fetchData())
      .then(() => this.spinnerService.hide());
  }

  fetchData() {
    return this.msrService.getAll()
      .then(data => {
        _.each(data, (item) => this.decorateWithMetadata(item));
        this.msrList = data;
        this.applyFilters();
      });
  }

  applyFilters(){
    this.msrFiltered = _.chain(this.msrList)
        .filter((item) => this.filterBySelectedRequestingUnits(item))
        .filter((item) => this.filterBySelectedStatuses(item))
        .filter((item) => this.filterBySelectedSupportUnits(item))
        .value();
  }

  filterBySelectedRequestingUnits(item) {
    if (this.filterControls.requestingUnits.selected.length === 0) { return true; }
    return _.includes(this.filterControls.requestingUnits.selected, item.RequestingUnit.Id);
  }

  filterBySelectedStatuses(item) {
    if (this.filterControls.statuses.selected.length === 0) { return true; }
    return _.includes(this.filterControls.statuses.selected, item.Status);
  }

  filterBySelectedSupportUnits(item) {
    if (this.filterControls.supportUnits.selected.length === 0) { return true; }
    return _.includes(this.filterControls.supportUnits.selected, item.SupportUnit.Id);
  }

}
