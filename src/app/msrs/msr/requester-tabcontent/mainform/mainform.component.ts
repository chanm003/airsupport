import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Msr } from '../../../shared/msr.model';
import { PeopleService } from '../../../../core/people.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styles: []
})
export class MainformComponent implements OnChanges, OnInit {
  @Input() msr: Msr;
  @Input() cachedData: any;
  mainForm: FormGroup;
  validationMessages: any;
  getMatchingPeople = this.peopleService.search;
  operationTypes: Array<string> = [
    'Combat Support (ACS)',
    'Aviation Foreign Internal Defense (AvFID)',
    'Command and Control (C2)',
    'Information Operations (IO)',
    'Intelligence, Surveillance, Reconnaissance (ISR)',
    'Strike/Fires',
    'AIR Mobility (SAM)',
    'Special Tactics/Battlefield Airman (ST/BAO)',
    'Cargo/Personnel Move'
  ];

  ngbDateRangeValid(startFieldName: string, endFieldName: string) {
    return  (fg: AbstractControl): {[key: string]: boolean} | null => {
      const startFieldVal = fg.get(startFieldName).value;
      const endFieldVal = fg.get(endFieldName).value;

      if (!startFieldVal || !endFieldVal || !startFieldVal.year || !endFieldVal.year) {
        /*one or both date pickers blank */
        return null;
      }

      const startDate = new Date(startFieldVal.year, startFieldVal.month - 1, startFieldVal.day);
      const endDate = new Date(endFieldVal.year, endFieldVal.month - 1, endFieldVal.day);

      if (startDate <= endDate) {
        return null;
      }

      return { 'startNotBeforeEnd': true };
    };
  }


  constructor(private fb: FormBuilder, private peopleService: PeopleService) {
    this.mainForm = this.fb.group({
      'RequestingUnitId': ['', Validators.required],
      'OperationType': ['', Validators.required],
      'SelectedRequesters': [[], Validators.required],
      'AltPOC': '',
      'RequesterEmail': ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
      'AltEmail': ['', Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')],
      'RequesterPhone': ['', Validators.required],
      'AltPhone': '',
      'missionDateRange': this.fb.group({
          'MissionStart': ['', Validators.required],
          'MissionEnd': ['', Validators.required],
      }, {validator: this.ngbDateRangeValid('MissionStart', 'MissionEnd')}),
      'Conop': '',
      'AirfieldLocations': '',
      'NegativeImpact': '',
      'MedicalSupportRequired': '',
      'MedicalSupportReqs': '',
      'CommunicationSupportRequired': '',
      'CommunicationSupportReqs': ''
    });

    this.validationMessages = {
      'RequestingUnitId': {
        required: 'Requesting Unit is required'
      },
      'OperationType': {
        required: 'Operation Type is required'
      },
      'SelectedRequesters': {
        required: 'Requester is required'
      },
      'RequesterEmail': {
        required: 'Requester Email is required',
        pattern: 'Must be a valid email'
      },
      'AltEmail': {
        pattern: 'Must be a valid email'
      },
      'RequesterPhone': {
        required: 'Requester Phone is required'
      },
      'missionDateRange': {
        startNotBeforeEnd: 'Mission Start must precede Mission End'
      },
      'missionDateRange.MissionStart': {
        required: 'Mission Start is required',
        ngbDate: 'Must be format MM/DD/YYYY'
      },
      'missionDateRange.MissionEnd': {
        required: 'Mission End is required',
        ngbDate: 'Must be format MM/DD/YYYY'
      },
      'Conop': {
        required: 'CONOP is required in order to submit this MSR'
      },
      'CommunicationSupportReqs': {
        required: 'Requirements for communications support is required'
      },
      'MedicalSupportReqs': {
        required: 'Requirements for medical support is required'
      }
     };

    this.mainForm.get('CommunicationSupportRequired').valueChanges
      .subscribe(value =>
        (value) ? this.makeFieldRequired('CommunicationSupportReqs') : this.makeFieldOptional('CommunicationSupportReqs')
      );

    this.mainForm.get('MedicalSupportRequired').valueChanges
    .subscribe(value =>
        (value) ? this.makeFieldRequired('MedicalSupportReqs') : this.makeFieldOptional('MedicalSupportReqs')
      );
  }

  markFormDirty(fg?: FormGroup) {
    if (!fg) {
      fg = this.mainForm;
    }
    Object.keys(fg.controls).map((controlName) => {
      const ctrl = fg.get(controlName);
      if (ctrl instanceof FormGroup) {
        this.markFormDirty(ctrl);
      } else {
        ctrl.markAsDirty();
      }
    });
  }

  isValid() {
    return this.mainForm.valid;
  }

  makeFieldRequired(fieldName: string) {
    const ctrl = this.mainForm.get(fieldName);
    ctrl.setValidators(Validators.required);
    ctrl.updateValueAndValidity();
  }

  makeFieldOptional(fieldName: string) {
    const ctrl = this.mainForm.get(fieldName);
    ctrl.clearValidators();
    ctrl.updateValueAndValidity();
  }

  onRequesterAdded(event) {
    const selectedPerson = _.last(this.msr.SelectedRequesters);
    this.msr.RequesterEmail = selectedPerson.Email;
    this.mainForm.get('RequesterEmail').markAsDirty();
  }
  onRequesterRemoved(event) {
    this.msr.RequesterEmail = '';
  }

  ngOnChanges() {}

  ngOnInit() {
  }

}

