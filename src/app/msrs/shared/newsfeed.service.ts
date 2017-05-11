import { Injectable } from '@angular/core';
import { ExceptionService } from '../../core/exception.service';
import { PagecontextService } from '../../core/pagecontext.service';
import { NewsfeedItem } from '../../msrs/shared/newsfeed.model';

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

  create(changes: Array<NewsfeedItem>) {
    if (!changes.length) {
      return Promise.resolve(null);
    }

    const promises = [];

    changes.forEach((item) => {
      const promise = this.pagecontextService.getWeb().lists.getByTitle(this.listName).items.add({
        Type: item.Type,
        JSON: JSON.stringify(item.JSON),
        RelatedMsrId: item.RelatedMsrId
      })
      .then(r => {
          console.log(r);
      });
      promises.push(promise);
    });

    return Promise.all(promises);
  }

  get(id: number) {
    if (!id) { return Promise.resolve(null); }

    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items
      .getById(id)
      .select(...this.fieldsToSelect)
      .expand(...this.fieldsToExpand)
      .get();
  }
}
