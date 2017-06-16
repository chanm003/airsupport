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
    return this.pagecontextService.sendEmail(msg.to, msg.cc, msg.subject, msg.body);
  }

  createFromChangeReport(changeReport: MsrChangeReport, msr: Msr) {
    this.cacheddataService.getAll()
      .then(cacheData => this.sendNotifications(cacheData, changeReport, msr));
  }

  private sendNotifications(cachedData: any, changeReport: MsrChangeReport, msr: Msr) {
    /*FIRE AND FORGET, so not returning promise*/
    Promise.all([
      (changeReport.StatusChange && changeReport.StatusChange.JSON.emailTemplate) ?
        this.send(this.generateMessage(cachedData, msr, changeReport.StatusChange.JSON.emailTemplate)) : Promise.resolve(null)
    ]);
  }

  private generateMessage(cachedData: any, msr: Msr, emailTemplate: string): EmailMessage {
    const currentUser = cachedData.currentUser.Title;
    const msrTitle = `MSR (${msr.SelectedMissions[0].Title})`;
    const url = `${this.pagecontextService.getInfo().currentWebAbsoluteUrl}/index.aspx#/msrs/${msr.Id}`;
    const supportUnit: any = _.find(cachedData.supportUnits, {Id: msr.SupportUnitId});

    const funcs = {
      'AssignedToSupportUnit': () => {
        const recipients = [];
        const courtesyCopy = [msr.RequesterEmail, msr.Author.EMail];
        _.each(supportUnit.Users.results, (user) => recipients.push(user.EMail));
        const compiled = _.template(cachedData.emailTemplates['AssignedToSupportUnit'].replace(/\n/g, '<br/>'));
        const screenshot = `<img src="${this.pagecontextService.getInfo().screenshotsFolder}/supportunit.png"/>`;
        return {
          from: 'mike@chanm003.onmicrosoft.com',
          to: _.uniq(recipients),
          cc: _.uniq(courtesyCopy),
          subject: `${msrTitle} has been assigned to the ${supportUnit.Name}`,
          body: compiled({currentUser: currentUser, title: msrTitle, supportUnit: supportUnit.Name, url: url, screenshot: screenshot})
        };
      },
      'Submitted': () => {
        let recipients = [];
        _.each(cachedData.owningUnits, (unit) => recipients = recipients.concat(_.map(unit.Users.results, 'EMail')));
        const compiled = _.template(cachedData.emailTemplates['Submitted'].replace(/\n/g, '<br/>'));
        const screenshot = `<img src="${this.pagecontextService.getInfo().screenshotsFolder}/takeownership.png"/>`;
        return {
          from: 'mike@chanm003.onmicrosoft.com',
          to: _.uniq(recipients),
          subject: `${msrTitle} has been submitted`,
          body: compiled({currentUser: currentUser, title: msrTitle, url: url, screenshot: screenshot})
        };
      },
      'Vetting': () => {
        const owningUnits = _.map(msr.OwningUnits, 'Name').join(', ');
        const compiled = _.template(cachedData.emailTemplates['Vetting'].replace(/\n/g, '<br/>'));
        return {
          from: 'mike@chanm003.onmicrosoft.com',
          to: _.uniq([msr.RequesterEmail, msr.Author.EMail]),
          subject: `${owningUnits} is vetting ${msrTitle}`,
          body: compiled({currentUser: currentUser, title: msrTitle, url: url, owningUnits: owningUnits})
        };
      },
      'Planning': () => {
        const compiled = _.template(cachedData.emailTemplates['Planning'].replace(/\n/g, '<br/>'));
        return {
          from: 'mike@chanm003.onmicrosoft.com',
          to: _.uniq([msr.RequesterEmail, msr.Author.EMail]),
          subject: `${supportUnit.Name} has started planning for ${msrTitle}`,
          body: compiled({currentUser: currentUser, title: msrTitle, url: url, supportUnit: supportUnit.Name})
        };
      },
      'Approved': () => {
        const compiled = _.template(cachedData.emailTemplates['Approved'].replace(/\n/g, '<br/>'));
        return {
          from: 'mike@chanm003.onmicrosoft.com',
          to: _.uniq([msr.RequesterEmail, msr.Author.EMail]),
          subject: `${msrTitle} has been approved`,
          body: compiled({currentUser: currentUser, title: msrTitle, url: url})
        };
      }
    };
    return funcs[emailTemplate]();
  }
}

export class EmailMessage {
  from: string;
  to: Array<string>;
  cc: Array<string>;
  subject: string;
  body: string;
}