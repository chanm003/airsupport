import { Injectable } from '@angular/core';
import { ExceptionService } from '../../core/exception.service';
import { PagecontextService } from '../../core/pagecontext.service';
import { NewsfeedItem, StatusChange } from '../../msrs/shared/newsfeed.model';
import { Msr, MsrTrackedChanges, MsrChangeReport } from '../../msrs/shared/msr.model';
import * as _ from 'lodash';

@Injectable()
export class NewsfeedService {
  listName = 'Newsfeed';
  fieldsToSelect = [
    'Author/Title', 'AuthorId', 'Created', 'JSON', 'RelatedMsrId', 'Type'
  ];
  fieldsToExpand = ['Author'];

  constructor(private exceptionService: ExceptionService,
    private pagecontextService: PagecontextService) {
  }

  create(item: NewsfeedItem) {
    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items.add({
      Type: item.Type,
      JSON: JSON.stringify(item.JSON),
      RelatedMsrId: item.RelatedMsrId
    })
    .then((resp) => {
      const newItem = resp.data;
      newItem.JSON = JSON.parse(newItem.JSON);
      newItem.Author = { Title: 'You' };
      return newItem;
    });
  }

  getByMsr(id: number) {
    if (!id) { return Promise.resolve([]); }

    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items
      .filter(`RelatedMsr/Id eq ${id}`)
      .orderBy('Id', false)
      .select(...this.fieldsToSelect)
      .expand(...this.fieldsToExpand)
      .get()
      .then((items) => {
        return _.map(items, (item: any) => {
          item.JSON = JSON.parse(item.JSON);
          return item;
        });
      });
  }

  private associateChangesToMsr(changeReport: MsrChangeReport, msrID: number) {
    _.each(changeReport, (val, key) => {
      if (val) {
        val.RelatedMsrId = msrID;
      }
    });
  }

  createFromChangeReport(changeReport: MsrChangeReport, msr: Msr) {
    this.associateChangesToMsr(changeReport, msr.Id);
    return Promise.all([
      (changeReport.StatusChange) ? this.create(changeReport.StatusChange) : Promise.resolve(null)
    ])
    .then((data) => {
      const changes = Array<NewsfeedItem>();

      data.forEach((resp) => {
        if (resp) {
          changes.push(resp);
        }
      });

      return changes;
    });
  }
}
