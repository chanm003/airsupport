import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagecontextService } from '../core/pagecontext.service';
import 'rxjs/add/observable/fromPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PeopleService {
    constructor(private http: Http, private pagecontextService: PagecontextService) { }

    searchUsers = (text: string): any => {
      let fieldsToSelect = '';
      if (environment.production) {
        /*on-prem SP2013, uppercase 'M'*/
        fieldsToSelect = 'Id,Name,WorkEMail';
      } else {
        /*cloud SP2013, lowercase 'm'*/
        fieldsToSelect = 'Id,Name,WorkEmail';
      }
      const webUrl = this.pagecontextService.getInfo().currentWebAbsoluteUrl;
      const url = `${webUrl}/_vti_bin/ListData.svc/UserInformationList?$select=${fieldsToSelect}&$filter=substringof('${text}',Name)`;
      return this.http.get(url).map((resp: Response) => {
        const results = resp.json().d.results;
        const mappedData = results.map(item => {
            /*make it look like data that comes back from /_api/web/siteusers*/
            return {
              Id: item.Id,
              Title: item.Name,
              Email: (item.WorkEmail) ? item.WorkEmail : item.WorkEMail,
              display: item.Name,
              value: item.Id
            };
          });
        return mappedData;
      });
    }
}
