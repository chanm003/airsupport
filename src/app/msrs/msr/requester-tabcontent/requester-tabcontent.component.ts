import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';
import { PeopleService } from '../../../core/people.service';

@Component({
  selector: 'app-requester-tabcontent',
  templateUrl: './requester-tabcontent.component.html',
  styles: [
    'a.list-group-item { cursor: pointer; }',
    'a.list-group-item.active:not([href]) { color: white; }'
  ]
})
export class RequesterTabcontentComponent implements OnInit {
  @Output() saveButtonClicked = new EventEmitter<string>();
  @Input() msr: Msr;
  @Input() dataEntryLookups: any;

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

  sectionNames: Array<string> = [
    'Personnel/Cargo', 'SAM', 'ST/BA'
  ];

  getMatchingPeople = this.peopleService.searchUsers;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
  }

  onRequesterAdded(event) {
    const selectedPerson = _.last(this.msr.SelectedRequesters);
    this.msr.RequesterEmail = selectedPerson.Email;
  }
  onRequesterRemoved(event) {
    this.msr.RequesterEmail = '';
  }
  onSaveButtonClicked(): void {
    this.msr.Status = 'Draft';
    this.saveButtonClicked.emit();
  }

  getAdditionalFormSection() {
    if (this.msr.OperationType === 'Cargo/Personnel Move') {
      return 'Cargo/Personnel Move';
    } else if (this.msr.OperationType === 'AIR Mobility (SAM)') {
      return 'AIR Mobility';
    } else if (this.msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)') {
      return 'Special Tactics/Battlefield Airman';
    } else {
      return '';
    }
  }
}
