import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Msr } from '../../../shared/msr.model';
import { PeopleService } from '../../../../core/people.service';
import { CacheddataService } from '../../../../core/cacheddata.service';
import { SpinnerService } from '../../../../core/spinner/spinner.service';
import * as _ from 'lodash';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styles: []
})
export class MainformComponent implements OnChanges, OnInit {
  @Input() msr: Msr;
  @Input() cachedData: any;
  modalRef: NgbModalRef;
  mainForm: FormGroup;
  validationMessages: any;
  getMatchingPeople = this.peopleService.search;
  operationTypes: Array<string> = [
    'SOF Aviation Support',
    'Cargo/Personnel Move',
    'Special Tactics/JTAC',
    'Intelligence, Surveillance, Reconnaissance (ISR)',
    'Strike/Fires',
    'Aviation Defense Institution Building (DIB)',
    'Command and Control (C2)',
    'Information Operations (IO)',
    'Other Support'
  ];
  classifications: Array<string> = [
    'UNCLASSIFIED',
    'CONFIDENTIAL',
    'SECRET'
  ];

  newRequestUnit = {
    name: '',
    email: '',
    phone: ''
  };

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


  constructor(private fb: FormBuilder, private peopleService: PeopleService, private modalService: NgbModal,
    private cacheddataService: CacheddataService, private spinnerService: SpinnerService,) {
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
      'CommunicationSupportReqs': '',
      'Classification': ['', Validators.required],
      'Releasability': ['', Validators.required],
      'ClassificationNotes': ''
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
      },
      'Classification': {
        required: 'Classification is required'
      },
      'Releasability': {
        required: 'Releasability is required'
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

  createRequestUnit() {
    this.spinnerService.show();
    this.cacheddataService.addRequestUnit(this.newRequestUnit)
      .then(() => this.cacheddataService.getAll())
      .then((data) => {
        this.cachedData = data;
        this.msr.RequestingUnit = _.find(this.cachedData.requestingUnits, {Name: this.newRequestUnit.name});
        this.msr.RequestingUnitId = this.msr.RequestingUnit.Id;
        this.modalRef.close();
        this.spinnerService.hide();
      });
  }

  openModal(modalContent) {
    this.modalRef = this.modalService.open(modalContent);
    this.modalRef.result.then(
      () => {
      }, (reason) => {
      });
  }

}

