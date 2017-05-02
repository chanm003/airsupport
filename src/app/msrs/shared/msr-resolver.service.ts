import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Msr } from './msr.model';
import { MsrService } from './msr.service';
import { DatatentrylookupsService } from '../../core/datatentrylookups.service';

export class MsrRouteData{
  constructor(public msr:Msr, public lookups:any){
  }
}

@Injectable()
export class MsrResolver implements Resolve<MsrRouteData> {
  constructor(
    private datatentrylookupsService: DatatentrylookupsService,
    private msrService: MsrService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = +route.params['id'];
    return Promise.all([
      this.msrService.get(id),
      this.datatentrylookupsService.getAll()
    ])
    .then(data => {
      const msr = data[0];
      const lookups = data[1];

      if (msr) {
        return new MsrRouteData(new Msr(msr), lookups);
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