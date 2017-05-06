import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagecontextService } from '../core/pagecontext.service';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class PeopleService {
    constructor(private pagecontextService: PagecontextService) { }

    searchUsers = (text: string): any => {
      return Observable.fromPromise(this.pagecontextService.getWeb().siteUsers
        .select('Id', 'Title', 'Email')
        .filter(`substringof('${text}',Title)`)
        .orderBy('Title')
        .get())
        .map(data => {
          const val = data.map(item => {
            item.display = item.Title;
            item.value = item.Id;
            return item;
          });
          return val;
        });
    }
}
