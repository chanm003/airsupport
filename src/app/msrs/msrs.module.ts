import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routedComponents, MsrsRoutingModule } from './msrs-routing.module';
import { MsrService } from './shared/msr.service';

@NgModule({
  imports: [
    CommonModule,
    MsrsRoutingModule
  ],
  declarations: [routedComponents],
  providers: [MsrService]
})
export class MsrsModule { }