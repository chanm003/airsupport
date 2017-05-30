import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Msr } from '../../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-cargoform',
  templateUrl: './cargoform.component.html',
  styles: []
})
export class CargoformComponent implements OnChanges{
  @Input() msr: Msr;
  cargoForm: FormGroup;
  validationMessages: any;
  constructor(private formBuilder: FormBuilder) {
    this.cargoForm = this.formBuilder.group({
     'NumberOfPAX': ['', Validators.required],
     'PaxBaggageWeight': '',
     'NumberOfPallets': '',
     'IsuType': ['', Validators.required],
     'PalletWeight': '',
     'IsuWeight': '',
     'HazmatRequired': '',
     'AmplifyingDetail': ''
    });

    this.validationMessages = {
      'NumberOfPAX': {
        required: 'Number of PAX is required'
      },
      'IsuType': {
        required: 'ISU Type is required'
      }
    };
  }

  isValid() {
    return this.shouldShow() && this.cargoForm.valid;
  }

  shouldShow() {
    return this.msr.OperationType === 'Cargo/Personnel Move';
  }

  ngOnChanges() {}
}
