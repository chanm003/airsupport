import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsrComponent } from './msr/msr.component';
import { MsrListComponent } from './msr-list/msr-list.component';
import { MsrsComponent } from './msrs.component';
import { MsrResolver } from './shared/msr-resolver.service';
import { RequesterTabcontentComponent } from './msr/requester-tabcontent/requester-tabcontent.component';

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
          msr: MsrResolver
        }
      }
    ]
  },
];
export const routedComponents = [MsrsComponent, MsrListComponent, MsrComponent, RequesterTabcontentComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MsrResolver]
})
export class MsrsRoutingModule { }
