import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateParserFormatterFactory} from './core/datepickerparser';
import { TagInputModule } from 'ng2-tag-input';
import {NgPipesModule} from 'ngx-pipes';
// imports: imports the module's exports. which are usually
// declarables(components / directives / pipes) and providers.
// in our case the FilterTextModule has a provider.
//
// exports: exports modules AND declarables (components/directives/pipes) that other modules may want to use
// SharedModule does not use CommonModule, but does use FormsModule.
// Even so, we import/export both of these because most other modules will import SharedModule and will need them.
@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, TagInputModule, NgPipesModule],
  exports: [CommonModule, FormsModule, NgbModule, TagInputModule, NgPipesModule],
  declarations: [],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useFactory: NgbDateParserFormatterFactory
    }
  ]
})
export class SharedModule { }
