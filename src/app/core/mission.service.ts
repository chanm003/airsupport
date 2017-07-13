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
      const url = '/OAA/app/Index.aspx#/new';
      return {
        cardTitle: 'Link this MSR to an OAA',
        cardText: `Does an OAA already exist? If so, start typing in the search box below.  
          Otherwise, please <a href="${url}">create an OAA</a> first, then return to this form.`,
        autocompletePlaceholderText: `Search existing OAAs`
      };
    }

    extractSelectedMissionFromQueryString(params) {
      if (!params['oaaID'] || !params['oaaTitle'] || !params['eventID']) {
        return null;
      }

      return {
        Id: params['oaaID'],
        EventID: params['eventID'],
        Title: params['oaaTitle'],
        display: params['oaaTitle'],
        value: params['oaaID']
      };
    }

    parseMissionTitle(msn) {
      msn.display = msn.Title = msn.Title.replace(/\d{1,2}\/\d{1,2}\/\d{4} - \d{1,2}\/\d{1,2}\/\d{4}\s{1}/g, '');
    }
}
