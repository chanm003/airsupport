import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExceptionService } from './exception.service';
import { PagecontextService } from './pagecontext.service';
import { CacheddataService } from './cacheddata.service';
import { EntityService } from './entity.service';
import { PeopleService } from './people.service';
import { MissionService } from './mission.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HttpModule } from '@angular/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { PrintformService } from './printform.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule,
    LocalStorageModule.withConfig({
      prefix: 'msr-app',
      storageType: 'sessionStorage'
    })
  ],
  exports: [
    CommonModule, FormsModule, HttpModule, SimpleNotificationsModule, LocalStorageModule, SpinnerComponent
  ],
  declarations: [
    SpinnerComponent
  ],
  providers: [
    CacheddataService,
    EntityService,
    ExceptionService,
    PagecontextService,
    PrintformService,
    PeopleService,
    MissionService,
    SpinnerService
  ]
})
export class CoreModule { }
