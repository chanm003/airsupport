import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Msr } from '../../../shared/msr.model';

@Component({
  selector: 'app-cargoform',
  templateUrl: './cargoform.component.html',
  styles: []
})
export class CargoformComponent implements OnChanges{
  @Input() msr: Msr;
  @Output() isValid = new EventEmitter();
  private cargoForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.cargoForm = this.formBuilder.group({
     'NumberOfPAX': ['', Validators.required],
     'PaxBaggageWeight': '',
     'NumberOfPallets': '',
     'IsuType': '',
     'PalletWeight': '',
     'IsuWeight': '',
     'HazmatRequired': '',
     'AmplifyingDetail': ''
    });
  }

  ngOnChanges() {}
}
