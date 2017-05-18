import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExceptionService } from './exception.service';
import { PagecontextService } from './pagecontext.service';
import { DatatentrylookupsService } from './datatentrylookups.service';
import { EntityService } from './entity.service';
import { PeopleService } from './people.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SimpleNotificationsModule,
    LocalStorageModule.withConfig({
      prefix: 'msr-app',
      storageType: 'sessionStorage'
    })
  ],
  exports: [
    CommonModule, FormsModule, SimpleNotificationsModule, LocalStorageModule
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
