import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Msr } from './msr.model';
import { MsrService } from './msr.service';

@Injectable()
export class MsrResolver implements Resolve<Msr> {
  constructor(
    private msrService: MsrService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = +route.params['id'];
    return this.msrService.get(id)
      .then(msr => {
        if (msr) {
          return <Msr>msr;
        }
        // Return a new object, because we're going to create a new one
        return new Msr();
      })
      .catch((error: any) => {
        console.log(`${error.message}. Heading back to MSR list`);
        this.router.navigate(['/msrs']);
        return null;
      });
  }
}