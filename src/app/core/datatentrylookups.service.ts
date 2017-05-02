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

  private getRequestingUnits(){
    const listName = 'Requesting Units';
    const fieldsToSelect = ['Id', 'Name', 'Email', 'VerificationDate', 'PhoneNumber'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .get();
  }

  private getSubunits(){
    const listName = 'Subunits';
    const fieldsToSelect = ['Id', 'Name', 'PocName', 'PocPhone', 'PocEmail', 'ParentUnitId'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .get();
  }

  private getSupportUnits(){
    const listName = 'Support Units';
    const fieldsToSelect = ['Id', 'Name', 'Email', 'VerificationDate', 'PhoneNumber', 'Users/Id', 'Users/Title'];
    const fieldsToExpand = ['Users'];

    return this.pagecontextService.getWeb().lists.getByTitle(listName).items
      .select(...fieldsToSelect)
      .expand(...fieldsToExpand)
      .get();
  }

  getAll() {
    return Promise.all([
      this.getOwningUnits(),
      this.getRequestingUnits(),
      this.getSubunits(),
      this.getSupportUnits()
    ])
    .then(data => {
      const supportUnits = data[3];
      const subunits = data[2];

      _.each(supportUnits, function (item) {
        item.Subunits = _.filter(subunits, { ParentUnitId: item.Id });
      });

      return {
          supportUnits: supportUnits,
          requestingUnits: data[1],
          owningUnits: data[0]
      };
    });
  }
}
