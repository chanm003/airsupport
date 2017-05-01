import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsrComponent } from './msr/msr.component';
import { MsrListComponent } from './msr-list/msr-list.component';
import { MsrsComponent } from './msrs.component';

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
        component: MsrComponent
      }
    ]
  },
];
export const routedComponents = [MsrsComponent, MsrListComponent, MsrComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsrsRoutingModule { }
