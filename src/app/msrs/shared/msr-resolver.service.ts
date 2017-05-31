import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Msr } from './msr.model';
import { NewsfeedItem } from './newsfeed.model';
import { MsrService } from './msr.service';
import { NewsfeedService } from './newsfeed.service';
import { CacheddataService } from '../../core/cacheddata.service';

export class MsrRouteData{
  constructor(public msr: Msr, public lookups: any) {
  }
}

@Injectable()
export class MsrResolver implements Resolve<MsrRouteData> {
  constructor(
    private cacheddataService: CacheddataService,
    private msrService: MsrService,
    private newsfeedService: NewsfeedService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = +route.params['id'];
    return Promise.all([
      this.msrService.get(id),
      this.cacheddataService.getAll(),
      this.newsfeedService.getByMsr(id)
    ])
    .then(data => {
      const msr = data[0];
      const lookups = data[1];
      const relatedNewsfeedItems = data[2];

      if (msr) {
        msr.NewsfeedItems = <Array<NewsfeedItem>>relatedNewsfeedItems;
        return new MsrRouteData(msr, lookups);
      }
      // Return a new object, because we're going to create a new one
      return new MsrRouteData(new Msr(), lookups);
    })
    .catch((error: any) => {
      console.log(`${error.message}. Heading back to MSR list`);
      this.router.navigate(['/msrs']);
      return null;
    });
  }
}
