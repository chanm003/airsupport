import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsrComponent } from './msr/msr.component';
import { MsrListComponent } from './msr-list/msr-list.component';
import { MsrsComponent } from './msrs.component';
import { MsrResolver } from './shared/msr-resolver.service';
import { RequesterTabcontentComponent } from './msr/requester-tabcontent/requester-tabcontent.component';
import { CargoformComponent } from './msr/requester-tabcontent/cargoform/cargoform.component';
import { AirmobilityformComponent } from './msr/requester-tabcontent/airmobilityform/airmobilityform.component';
import { SpecialtacticsformComponent } from './msr/requester-tabcontent/specialtacticsform/specialtacticsform.component';
import { PnforcesComponent } from './msr/requester-tabcontent/pnforces/pnforces.component';
import { DropzonesComponent } from './msr/requester-tabcontent/dropzones/dropzones.component';
import { VehiclesComponent } from './msr/requester-tabcontent/vehicles/vehicles.component';
import { PlatformsComponent } from './msr/requester-tabcontent/platforms/platforms.component';
import { TargetlocationsComponent } from './msr/requester-tabcontent/targetlocations/targetlocations.component';
import { LandingzonesComponent } from './msr/requester-tabcontent/landingzones/landingzones.component';
import { OwnerTabcontentComponent } from './msr/owner-tabcontent/owner-tabcontent.component';
import { SupportTabcontentComponent } from './msr/support-tabcontent/support-tabcontent.component';
import { OutsideunitsComponent } from './msr/support-tabcontent/outsideunits/outsideunits.component';
import { SubunitsComponent } from './msr/support-tabcontent/subunits/subunits.component';
import { StatusTabcontentComponent } from './msr/status-tabcontent/status-tabcontent.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { StatusChangeComponent } from './newsfeed/status-change/status-change.component';
import { MainformComponent } from './msr/requester-tabcontent/mainform/mainform.component';
import { UpdatestatusComponent } from './msr/updatestatus/updatestatus.component';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
  {
    path: '',
    component: MsrsComponent,
    children: [
      {
        path: '',
        component: MsrListComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: ':id',
        component: MsrComponent,
        resolve: {
          data: MsrResolver
        }
      }
    ]
  },
  
];
export const routedComponents = [
  MsrsComponent,
  MsrListComponent,
  MsrComponent,
  RequesterTabcontentComponent,
  MainformComponent,
  AirmobilityformComponent,
  VehiclesComponent,
  PlatformsComponent,
  TargetlocationsComponent,
  LandingzonesComponent,
  CargoformComponent,
  NewsfeedComponent,
  SpecialtacticsformComponent,
  PnforcesComponent,
  DropzonesComponent,
  OwnerTabcontentComponent,
  SupportTabcontentComponent,
  SubunitsComponent,
  OutsideunitsComponent,
  StatusTabcontentComponent,
  StatusChangeComponent,
  UpdatestatusComponent,
  CalendarComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MsrResolver]
})
export class MsrsRoutingModule { }
