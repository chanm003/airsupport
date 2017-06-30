import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsrService } from '../shared/msr.service';
import { ActivatedRoute } from '@angular/router';
import { MsrRouteData } from '../shared/msr-resolver.service';
import { Msr } from '../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styles: [`th {
   font-family:Arial;
   color:black;
   background-color:lightgrey;
}`, `thead {
   display:table-header-group;
}`, `tbody {
   display:table-row-group;
}`]
})
export class PrintComponent implements OnInit, OnDestroy {
  private sub: any;
  private msr: any;
  showFields = Msr.fieldsLogic;
  cachedData: any;

  items = Array.from(Array(200), (_,x) => x);

  constructor(private msrService: MsrService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe((resolved: {data: MsrRouteData}) => {
      this.msr = resolved.data.msr;
      this.cachedData = resolved.data.lookups;
      this.msr.aieTypesDelimited = this.getAIETypes(this.msr);
      const owningUnits = this.getOwningUnits(this.msr);
      this.msr.owningUnitsDelimited = _.map(owningUnits, 'Name').join('; ');
      this.msr.usersFromOwningUnits =
        _.chain(owningUnits)
          .map((item: any) => item.Users.results)
          .flatten()
          .uniqBy('Id')
          .value();
    });
  }

  ngOnDestroy() {
  }

  private getAIETypes(msr) {
    const types: Array<string> = [];
    if (msr.HoistRequired) { types.push('Hoist'); }
    if (msr.FastRopeRequired) { types.push('Fast Rope/FRIES'); }
    if (msr.RappelRequired) { types.push('Rappel'); }
    if (msr.OtherAIE) { types.push(msr.OtherAIE); }
    return types.join('; ');
  }

  getOwningUnits(msr) {
    return _.map(msr.OwningUnitsId, (item) => _.find(this.cachedData.owningUnits, {Id: item}));
  }
}
