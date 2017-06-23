import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent, DayPilotNavigatorComponent} from 'daypilot-pro-angular';
import {CacheddataService} from '../../core/cacheddata.service';
import {MsrService} from '../shared/msr.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: [`
  
  `]
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('scheduler')
  scheduler: DayPilotSchedulerComponent;
  @ViewChild('navigator')
  navigator: DayPilotNavigatorComponent;

  config: any = {
    timeHeaders: [
      { groupBy: 'Month', format: 'MMMM yyyy' },
      { groupBy: 'Day', format: 'd' }
    ],
    eventHeight: 40,
    scale: 'Day'
  };

  navigatorConfig: any = {
    showMonths: 3,
    skipMonths: 3,
    selectMode: 'month'
  };

  constructor(private cacheddataService: CacheddataService, private msrService: MsrService) { }

  ngOnInit() {
  }

  getColor(status) {
    if ( _.includes(['Approved'], status)) {
      return 'green';
    }

    if ( _.includes(['Canceled', 'Rejected'], status)) {
      return 'red';
    }

    return 'blue';
  }

  ngAfterViewInit() {
    this.cacheddataService.getAll()
      .then(data => {
        const supportUnits = data['supportUnits'].map(item =>  {
          return {id: item.Id, name: item.Name};
        });
        supportUnits.push({id: -1, name: 'Unassigned'});
        this.config.resources = supportUnits;
      });

    this.getEvents();
  }

  getEvents(start?) {
    if (!start) {
      start = moment().startOf('month');
    }
    this.config.startDate = start.format('YYYY-MM-DD');
    const end = start.clone().add(3, 'months').startOf('month');
    this.config.days = end.diff(start, 'days');

    this.msrService.getByDateRange(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
      .then(data => this.refreshEvents(data));
  }

  refreshEvents(data) {
    data = data.map(item => {
      return {
        id: item.Id,
        resource: item.SupportUnitId || -1,
        start: item.MissionStart.split('T')[0],
        end: item.MissionEnd.split('T')[0],
        text: JSON.parse(item.RelatedMission).Title,
        barColor: this.getColor(item.Status)
      };
    });
    this.config.events = data;
  }

  changeDate() {
    const dt = moment((<any>this.navigator.control.selectionStart).value);
    this.getEvents(dt);
  }

}


