import { Injectable } from '@angular/core';
import { ExceptionService } from '../../core/exception.service';
import { PagecontextService } from '../../core/pagecontext.service';
import { NewsfeedItem, StatusChange } from '../../msrs/shared/newsfeed.model';
import { Msr } from '../../msrs/shared/msr.model';
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

  createNotifications(prev: Msr, current: Msr) {
    return Promise.all([
      this.createStatusChangedNotification(current, prev)
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

  private createStatusChangedNotification(current, prev) {
     if (current.Status !== prev.Status) {
        const notification = new StatusChange();
        notification.RelatedMsrId = current.Id;
        notification.Type = StatusChange.name;
        notification.JSON = {
            prevStatus: prev.Status,
            newStatus: current.Status
        };
        return this.create(notification);
      } else {
        return Promise.resolve(null);
      }
  }
}
