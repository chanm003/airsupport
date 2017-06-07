import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import pnp, { Web } from 'sp-pnp-js';

@Injectable()
export class PagecontextService {

  constructor() {
    pnp.setup({
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        baseUrl: this.getInfo().currentWebAbsoluteUrl
    });
  }

  getInfo(): SpPageContext {
    if (environment.production) {
      const spPage = (<any>window);
      return {
        currentWebAbsoluteUrl: spPage._spPageContextInfo.webAbsoluteUrl,
        currentUserId: spPage._spPageContextInfo.userId,
        screenshotsFolder: `${spPage._spPageContextInfo.webAbsoluteUrl}/assets/img/screenshots`
      };
    } else {
      return {
        currentWebAbsoluteUrl: 'http://localhost/msrdev',
        currentUserId: 10,
        screenshotsFolder: `http://localhost:4200/assets/img/screenshots`
      };
    }
  }

  getWeb(): Web {
    return new Web(this.getInfo().currentWebAbsoluteUrl);
  }

  sendEmail(to: Array<string>, cc: Array<string> = [], subject: string, body: string) {
    return pnp.sp.utility.sendEmail({
      To: to,
      CC: cc,
      Subject: subject,
      Body: body
    });
  }
}

class SpPageContext {
  currentWebAbsoluteUrl: string;
  currentUserId: number;
  screenshotsFolder: string;
}
