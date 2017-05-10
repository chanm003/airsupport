import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExceptionService } from './exception.service';
import { PagecontextService } from './pagecontext.service';
import { DatatentrylookupsService } from './datatentrylookups.service';
import { EntityService } from './entity.service';
import { PeopleService } from './people.service';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule, FormsModule, SimpleNotificationsModule
  ],
  exports: [
    CommonModule, FormsModule, SimpleNotificationsModule
  ],
  declarations: [],
  providers: [
    DatatentrylookupsService,
    EntityService,
    ExceptionService,
    PagecontextService,
    PeopleService
  ]
})
export class CoreModule { }
