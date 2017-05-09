import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Msr } from '../shared/msr.model';
import { EntityService } from '../../core/entity.service';
import { MsrService } from '../shared/msr.service';
import { MsrRouteData } from '../shared/msr-resolver.service';

@Component({
  selector: 'app-msr',
  templateUrl: './msr.component.html',
  styles: []
})
export class MsrComponent implements OnInit {
  msrOnLoad: Msr;
  msrBeingEdited: Msr;
  dataEntryLookups: Array<any>;
  constructor(private route: ActivatedRoute, private entityService: EntityService, private msrService: MsrService) { }

  ngOnInit() {
    this.route.data.subscribe((resolved: {data:MsrRouteData}) => {
      this.dataEntryLookups = resolved.data.lookups;
      this.setEditMsr(resolved.data.msr);
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
}
