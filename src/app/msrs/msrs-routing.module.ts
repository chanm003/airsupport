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
  AirmobilityformComponent,
  CargoformComponent,
  SpecialtacticsformComponent,
  PnforcesComponent,
  DropzonesComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MsrResolver]
})
export class MsrsRoutingModule { }
