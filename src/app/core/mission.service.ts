import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagecontextService } from '../core/pagecontext.service';
import 'rxjs/add/observable/fromPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MissionService {
    constructor(private http: Http, private pagecontextService: PagecontextService) { }
    search = (text: string): any => {
      let webUrl = '';
      if (environment.production) {
        webUrl = '/oaa';
      } else {
        webUrl = 'http://localhost:80/oaa';
      }
      const url = `${webUrl}/_vti_bin/ListData.svc/OAA?$select=Id,Title,Event/Id&$expand=Event&$filter=substringof('${text}',Title)`;
      return this.http.get(url).map((resp: Response) => {
        const results = resp.json().d.results;
        const mappedData = results.map(item => {
            return {
              Id: item.Id,
              Title: item.Title,
              EventID: item.Event.Id,
              display: item.Title,
              value: item.Id
            };
          });
        return mappedData;
      });
    }

    getCardViewModel() {
      return {
        cardTitle: 'Link this MSR to an OAA',
        cardText: `Does an OAA already exist? If so, start typing in the search box below.  
          Otherwise, please <strong>create an OAA</strong> first, before returning to this form.`,
        autocompletePlaceholderText: `Search for OAAs`
      };
    }
}
