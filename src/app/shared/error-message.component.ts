import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';

@Component({
  selector: 'app-errormessage',
  template: `
  <div class="has-danger" *ngIf="hasErrors()">
      <div class="form-control-feedback" *ngFor="let e of getErrors()">
          {{e}}
      </div>
  </div>`
})
export class ErrorMessageComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Input() fieldName: string;
  @Input() validationMessages: any;
  constructor() {}
  ngOnInit(): void {
  }

  hasErrors() {
    const ctrl = this.parentFormGroup.get(this.fieldName);
    return (ctrl.touched || ctrl.dirty) && !ctrl.valid;
  }

  getErrors() {
    const ctrl = this.parentFormGroup.get(this.fieldName);
    return _.map(ctrl.errors, (value, key) => this.validationMessages[this.fieldName][key]);
  }
}
