import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExceptionService } from './exception.service';
import { PagecontextService } from './pagecontext.service';
import { DatatentrylookupsService } from './datatentrylookups.service';
import { EntityService } from './entity.service';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    CommonModule, FormsModule
  ],
  declarations: [],
  providers: [
    DatatentrylookupsService,
    EntityService,
    ExceptionService,
    PagecontextService
  ]
})
export class CoreModule { }
