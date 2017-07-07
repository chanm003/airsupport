import { Injectable } from '@angular/core';
import { PagecontextService } from './pagecontext.service';
import { ExceptionService } from './exception.service';
import { LocalStorageService } from 'angular-2-local-storage';
import * as _ from 'lodash';

@Injectable()
export class CacheddataService {

  constructor(private exceptionService: ExceptionService,
    private localStorageService: LocalStorageService,
    private pagecontextService: PagecontextService) {
  }

  private getStatuses() {
    const statuses = [
      { text: 'Draft', bootstrapBadge: 'badge-warning', color: '#f8cb00' },
      { text: 'Submitted', bootstrapBadge: 'badge-primary', color: '#1985ac' },
      { text: 'Vetting', bootstrapBadge: 'badge-primary', color: '#1985ac' },
      { text: 'Assigned', bootstrapBadge: 'badge-primary', color: '#1985ac' },
      { text: 'Planning', bootstrapBadge: 'badge-primary', color: '#1985ac' },
      { text: 'Approved', bootstrapBadge: 'badge-success', color: '#3a9d5d' },
      { text: 'Rejected', bootstrapBadge: 'badge-danger', color: '#f63c3a' },
      { text: 'Canceled', bootstrapBadge: 'badge-danger', color: '#f63c3a' }
    ];

    return Promise.resolve(statuses);
  }

  private getOwningUnits() {
    const listName = 'Owning Units';
    const fieldsToSelect = ['Id', 'Name', 'Users/Id', 'Users/Title', 'Users/EMail'];
    const fieldsToExpand = ['Users'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .expand(...fieldsToExpand)
      .get();
  }

  private getRequestingUnits() {
    const listName = 'Requesting Units';
    const fieldsToSelect = ['Id', 'Name', 'Email', 'VerificationDate', 'PhoneNumber'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .get();
  }

  private getSubunits() {
    const listName = 'Subunits';
    const fieldsToSelect = ['Id', 'Name', 'PocName', 'PocPhone', 'PocEmail', 'ParentUnitId'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .get();
  }

  private getSupportUnits() {
    const listName = 'Support Units';
    const fieldsToSelect = ['Id', 'Name', 'Email', 'VerificationDate', 'PhoneNumber', 'Users/Id', 'Users/Title', 'Users/EMail'];
    const fieldsToExpand = ['Users'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .expand(...fieldsToExpand)
      .get();
  }

  private getEmailTemplates() {
    const listName = 'EmailTemplates';
    const fieldsToSelect = ['Title', 'Body'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .get()
      .then((data) => {
        const templates = {};
        _.each(data, (item) => templates[item.Title] = item.Body);
        return templates;
      });
  }

  private getInfoForCurrentUser() {
    /*this.pagecontextService.getWeb().siteGroups.filter('CanCurrentUserViewMembership eq true').get()*/
    return Promise.all([
      this.pagecontextService.getWeb().currentUser.expand('Groups').get()
    ])
    .then(data => {
      const currentUser = data[0];
      return {
        Id: currentUser.Id,
        Email: currentUser.Email,
        Title: currentUser.Title,
        Groups: _.map(currentUser.Groups.results, (g: any) => { return {Id: g.Id, Title: g.Title}; })
      };
    });
  }

  checkUnits(units, currentUser) {
    return _.chain(units)
        .filter((unit: any) => {
          if (unit.Users && unit.Users.results) {
            return _.includes(_.map(unit.Users.results, 'Id'), currentUser.Id);
          }
          return false;
        })
        .map('Id')
        .value();
  }

  getAll() {
    const lookupsFromStorage = this.localStorageService.get('lookups');
    if (lookupsFromStorage) {
      return Promise.resolve(lookupsFromStorage);
    }

    return Promise.all([
      this.getOwningUnits(),
      this.getRequestingUnits(),
      this.getSubunits(),
      this.getSupportUnits(),
      this.getInfoForCurrentUser(),
      this.getEmailTemplates(),
      this.getStatuses()
    ])
    .then(data => {
      const owningUnits = data[0];
      const supportUnits = data[3];
      const subunits: Array<any> = data[2];
      const currentUser: any = data[4];

      _.each(supportUnits, function (item: any) {
        item.Subunits = _.filter(subunits, { ParentUnitId: item.Id });
      });

      currentUser.owningUnits = this.checkUnits(owningUnits, currentUser);
      currentUser.supportUnits = this.checkUnits(supportUnits, currentUser);

      const lookups = {
          supportUnits: supportUnits,
          requestingUnits: data[1],
          owningUnits: owningUnits,
          currentUser: currentUser,
          emailTemplates: data[5],
          statuses: data[6]
      };

      this.localStorageService.set('lookups', lookups);
      return this.localStorageService.get('lookups');
    });
  }

  addRequestUnit(unit) {
    return this.pagecontextService.getWeb().lists.getByTitle('Requesting Units').items.add({
      Name: unit.name,
      Email: unit.email,
      PhoneNumber: unit.phone
    })
    .then(() => this.localStorageService.remove('lookups'));
  }
}
