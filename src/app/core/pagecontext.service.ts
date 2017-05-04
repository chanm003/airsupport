import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as spns from 'sp-pnp-js';

@Injectable()
export class PagecontextService {

  constructor() {
    spns.setup({
        headers: {
            'Accept': 'application/json; odata=verbose'
        }
    });
  }

  getInfo(): SpPageContext {
    if (environment.production){
      const spPage = (<any>window);
      return {
        currentWebAbsoluteUrl: spPage._spPageContextInfo.webAbsoluteUrl,
        currentUserId: spPage._spPageContextInfo.userId
      }
    } else {
      return {
        currentWebAbsoluteUrl: 'http://localhost/msrdev',
        currentUserId: 10
      };
    }
  }

  getWeb(): spns.Web{
    return new spns.Web(this.getInfo().currentWebAbsoluteUrl);
  }
}

class SpPageContext{
  currentWebAbsoluteUrl: string;
  currentUserId: number;
}
