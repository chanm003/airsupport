import { Injectable } from '@angular/core';
import { ExceptionService } from '../../core/exception.service';
import { PagecontextService } from '../../core/pagecontext.service';
import { NewsfeedItem, StatusChange } from '../../msrs/shared/newsfeed.model';
import { Msr, MsrTrackedChanges, MsrChangeReport } from '../../msrs/shared/msr.model';
import { CacheddataService } from '../../core/cacheddata.service';
import * as _ from 'lodash';

@Injectable()
export class EmailnotificationService {
  constructor(private exceptionService: ExceptionService,
    private cacheddataService: CacheddataService,
    private pagecontextService: PagecontextService) {
  }

  private send(msg: EmailMessage) {
    console.log(msg);
  }

  createFromChangeReport(changeReport: MsrChangeReport, msrID: number, msr: Msr) {
    msr.Id = msrID;
    this.cacheddataService.getAll()
      .then(cacheData => this.sendNotifications(cacheData, changeReport, msr));
  }

  private sendNotifications(cachedData: any, changeReport: MsrChangeReport, msr: Msr) {
    /*FIRE AND FORGET*/
    Promise.all([
      (changeReport.StatusChange) ? this.send(this.generateMessage(cachedData, msr, changeReport.StatusChange)) : Promise.resolve(null)
    ]);
  }

  private generateMessage(cachedData: any, msr: Msr, item: NewsfeedItem): EmailMessage {
    const currentUser = cachedData.currentUser.Title;
    const msrTitle = `MSR (${msr.SelectedMissions[0].Title})`;
    const url = `${this.pagecontextService.getInfo().currentWebAbsoluteUrl}/index.aspx#/msrs/${msr.Id}`;

    const funcs = {
      'AssignedToSupportUnit': () => {
        const supportUnit: any = _.find(cachedData.supportUnits, {Id: msr.SupportUnitId});
        const recipients = [];
        recipients.push(msr.RequesterEmail);
        if (supportUnit && supportUnit.Users && supportUnit.Users.results) {
          _.each(supportUnit.Users.results, (user) => recipients.push(user.EMail));
        }
        const compiled = _.template(cachedData.emailTemplates['AssignedToSupportUnit']);
        return {
          from: 'mike@chanm003.onmicrosoft.com',
          to: _.uniq(recipients),
          subject: `${msrTitle} has been assigned to ${supportUnit.Name}`,
          body: compiled({currentUser: currentUser, title: msrTitle, supportUnit: supportUnit.Name, url: url})
        };
      }
    };
    return funcs[item.JSON.emailTemplate]();
  }
}

export class EmailMessage {
  from: string;
  to: Array<string>;
  subject: string;
  body: string;
}