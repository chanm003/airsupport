import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Msr } from '../shared/msr.model';
import { EntityService } from '../../core/entity.service';
import { MsrService } from '../shared/msr.service';
import { MsrRouteData } from '../shared/msr-resolver.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-msr',
  templateUrl: './msr.component.html',
  styles: []
})
export class MsrComponent implements OnInit {
  msrOnLoad: Msr;
  msrBeingEdited: Msr;
  dataEntryLookups: any;
  tabsLogic: any;
  constructor(private route: ActivatedRoute, private entityService: EntityService, private msrService: MsrService) { }

  ngOnInit() {
    this.route.data.subscribe((resolved: {data:MsrRouteData}) => {
      this.dataEntryLookups = resolved.data.lookups;
      this.setEditMsr(resolved.data.msr);
      this.setTabsLogic();
    });
  }

  saveMsr(tab) {
    if (!this.msrBeingEdited.Id){
      this.msrService.create(this.msrBeingEdited);
    } else {
      this.msrService.update(this.msrBeingEdited);
    }
  }

  setEditMsr(msr: Msr) {
    if (msr) {
      this.msrOnLoad = msr;
      this.msrBeingEdited = this.entityService.clone<Msr>(Msr, msr);
    }
  }

  isCurrentUserMemberOfOwningUnit() {
    return !!_.intersection(this.dataEntryLookups.currentUser.owningUnits, _.map(this.dataEntryLookups.owningUnits, 'Id')).length;
  }

  isCurrentUserMemberOfAssignedSupportUnit() {
    return _.includes(this.dataEntryLookups.currentUser.supportUnits, this.msrOnLoad.SupportUnitId);
  }

  setTabsLogic() {
    this.tabsLogic = {
      'JSOAC/JMOC': !!this.msrOnLoad.Id && this.isCurrentUserMemberOfOwningUnit(),
      'Support Unit': !!this.msrOnLoad.Id && !!this.msrOnLoad.SupportUnitId && this.isCurrentUserMemberOfAssignedSupportUnit(),
      'Status': !!this.msrOnLoad.Id
    };
  }
}
