import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  @Input() dataEntryLookups: any;
  @Output() isValid = new EventEmitter();
  private mainForm: FormGroup;
  getMatchingPeople = this.peopleService.searchUsers;
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

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService) {
    this.mainForm = this.formBuilder.group({
    });
  }

  onRequesterAdded(event) {
    const selectedPerson = _.last(this.msr.SelectedRequesters);
    this.msr.RequesterEmail = selectedPerson.Email;
  }
  onRequesterRemoved(event) {
    this.msr.RequesterEmail = '';
  }

  ngOnChanges() {}

  ngOnInit() {
  }

}

