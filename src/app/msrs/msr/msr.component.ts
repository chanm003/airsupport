import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Msr } from '../shared/msr.model';
import { EntityService } from '../../core/entity.service';
import { MsrService } from '../shared/msr.service';

@Component({
  selector: 'app-msr',
  templateUrl: './msr.component.html',
  styles: []
})
export class MsrComponent implements OnInit {
  msrOnLoad: Msr;
  msrBeingEdited: Msr;
  constructor(private route: ActivatedRoute, private entityService: EntityService, private msrService: MsrService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { msr: Msr }) => {
       this.setEditMsr(data.msr);
    });
  }

  saveMsr() {
    this.msrService.create(this.msrBeingEdited);
  }

  setEditMsr(msr: Msr) {
    if (msr) {
      this.msrOnLoad = msr;
      this.msrBeingEdited = this.entityService.clone<Msr>(msr);
    }
  }
}
