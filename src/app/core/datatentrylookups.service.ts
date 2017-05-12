import { Injectable } from '@angular/core';
import { PagecontextService } from './pagecontext.service';
import { ExceptionService } from './exception.service';
import * as _ from 'lodash';

@Injectable()
export class DatatentrylookupsService {

  constructor(private exceptionService: ExceptionService,
    private pagecontextService: PagecontextService) {
  }

  private getOwningUnits() {
    const listName = 'Owning Units';
    const fieldsToSelect = ['Id', 'Name', 'Users/Id', 'Users/Title'];
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
    const fieldsToSelect = ['Id', 'Name', 'Email', 'VerificationDate', 'PhoneNumber', 'Users/Id', 'Users/Title'];
    const fieldsToExpand = ['Users'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .expand(...fieldsToExpand)
      .get();
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
    return Promise.all([
      this.getOwningUnits(),
      this.getRequestingUnits(),
      this.getSubunits(),
      this.getSupportUnits(),
      this.getInfoForCurrentUser()
    ])
    .then(data => {
      const owningUnits = data[0];
      const supportUnits = data[3];
      const subunits = data[2];
      const currentUser = data[4];

      _.each(supportUnits, function (item) {
        item.Subunits = _.filter(subunits, { ParentUnitId: item.Id });
      });

      currentUser.owningUnits = this.checkUnits(owningUnits, currentUser);
      currentUser.supportUnits = this.checkUnits(supportUnits, currentUser);

      return {
          supportUnits: supportUnits,
          requestingUnits: data[1],
          owningUnits: owningUnits,
          currentUser: currentUser
      };
    });
  }
}
