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
  showPanels = Msr.panelsLogic;
  cachedData: any;

  items = Array.from(Array(200), (_,x) => x);

  constructor(private msrService: MsrService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe((resolved: {data: MsrRouteData}) => {
      this.msr = resolved.data.msr;
      this.cachedData = resolved.data.lookups;
      this.msr.aieTypesDelimited = this.getAIETypes(this.msr);
      this.msr.RequestingUnit =  _.find(this.cachedData.requestingUnits, {Id: this.msr.RequestingUnitId});
      this.msr.SupportUnit =  _.find(this.cachedData.supportUnits, {Id: this.msr.SupportUnitId});
      this.msr.OwningUnits = this.getOwningUnits(this.msr);
      _.each(this.msr.OwningUnits, (unit) => {
        const recipients = _.map(unit.Users.results, 'EMail').join(',');
        const subject = encodeURI(`MSR (${this.msr.SelectedMissions[0].Title})`);
        unit.mailToHref = `mailto:${recipients}?subject=${subject}`;
      });
      const supportUnit: any = _.find(this.cachedData.supportUnits, {Id: this.msr.SupportUnitId});
      if (supportUnit) {
        this.msr.usersFromSupportUnit = supportUnit.Users.results;
        _.each(this.msr.AssignedSubunits, (item) => item.subunit = _.find(supportUnit.Subunits, {Id: item.subunitId}));
      }
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

  onPrintButtonClicked() {
    window.print();
  }
}
