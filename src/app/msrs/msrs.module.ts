import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../app.shared';

import { routedComponents, MsrsRoutingModule } from './msrs-routing.module';
import { MsrService } from './shared/msr.service';
import { NewsfeedService } from './shared/newsfeed.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MsrsRoutingModule
  ],
  declarations: [routedComponents],
  providers: [MsrService, NewsfeedService]
})
export class MsrsModule { }
