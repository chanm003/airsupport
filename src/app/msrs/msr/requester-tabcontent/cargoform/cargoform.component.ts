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
  @Output() isValid = new EventEmitter();
  private cargoForm: FormGroup;
  private validationMessages: any;
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

    this.cargoForm.valueChanges.subscribe(() => {
      if (this.shouldShow()) {
        this.isValid.emit(this.cargoForm.valid);
      } else {
        this.isValid.emit(false);
      }
    });
  }

  shouldShow() {
    return this.msr.OperationType === 'Cargo/Personnel Move';
  }

  ngOnChanges() {}
}
