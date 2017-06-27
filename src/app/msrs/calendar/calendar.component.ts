import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent, DayPilotNavigatorComponent} from 'daypilot-pro-angular';
import {CacheddataService} from '../../core/cacheddata.service';
import { PagecontextService} from '../../core/pagecontext.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
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

  filter = {
    text: ''
  };

  config: any = {
    bubble: new DayPilot.Bubble(),
    eventHeight: 40,
    eventMoveHandling: 'Disabled',
    eventResizeHandling: 'Disabled',
    onEventClick: (args) => {
      const dayPilotEvent = args.e.toJSON();
      const url = `${this.pagecontextService.getInfo().currentWebAbsoluteUrl}/index.aspx#/msrs/${dayPilotEvent.id}`;
      window.open(url, '_blank');
    },
    onEventFilter: args => {
      const params = args.filter;
      const currentItem = args.e;
      const strCurrentItem = currentItem.text().toLowerCase() + currentItem.data.areas[0].html.toLowerCase() +
        currentItem.data.bubbleHtml.toLowerCase();
      if (params.text && !_.includes(strCurrentItem, params.text.toLowerCase())) {
        args.visible = false;
      }
    },
    scale: 'Day',
    timeHeaders: [
      { groupBy: 'Month', format: 'MMMM yyyy' },
      { groupBy: 'Day', format: 'd' }
    ]
  };

  navigatorConfig: any = {
    showMonths: 3,
    skipMonths: 3,
    selectMode: 'month'
  };

  constructor( private cacheddataService: CacheddataService, private msrService: MsrService,
    private pagecontextService: PagecontextService, private spinnerService: SpinnerService) { }

  applyFilter() {
    this.scheduler.control.events.filter(this.filter);
  }

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

    this.spinnerService.show();
    this.msrService.getByDateRange(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
      .then(data => {
        this.refreshEvents(data);
        this.spinnerService.hide();
      });
  }

  clearFilter() {
    this.filter.text = '';
    this.applyFilter();
  }

  refreshEvents(data) {
    data = data.map(item => {
      return {
        id: item.Id,
        resource: item.SupportUnitId || -1,
        start: item.MissionStart.split('T')[0],
        end: item.MissionEnd.split('T')[0],
        text: JSON.parse(item.RelatedMission).Title,
        barColor: this.getColor(item.Status),
        bubbleHtml: `
          <div style="padding:5px 10px 0px 10px;">
            <address>
              <strong>${item.Requester.Title}</strong><br>
              ${item.RequestingUnit.Name}<br>
              <i class="fa fa-envelope"></i> ${item.RequesterEmail}<br>
              <i class="fa fa-phone-square"></i> ${item.RequesterPhone}<br>
              ${item.Conop}
            </address>
          </div>
        `,
        areas:  [
          { bottom: 5, left: 3, html: item.OperationType, style: '' }
        ]
      };
    });
    this.config.events = data;
  }

  changeDate() {
    const dt = moment((<any>this.navigator.control.selectionStart).value);
    this.getEvents(dt);
  }

}


