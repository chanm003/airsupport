import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';

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
    'Request', 'Personnel/Cargo', 'SAM', 'ST/BA'
  ];

  selectedSectionName = 'Request';

  selectablePeople = [
    { Id: 10, Title: 'Mike Chan' },
    { Id: 16, Title: 'Deepa Rao' },
    { Id: 110, Title: 'Chantal Malmstrom' }
  ];
  selectedPeople = _.map([{ Id: 10, Title: 'Mike Chan' }], (person) => {
    (<any>person).display = person.Title;
    (<any>person).value = person.Id;
    return person;
  });

  constructor() { }

  ngOnInit() {
  }

  onSaveButtonClicked():void{
    this.saveButtonClicked.emit('request');
  }

  shouldShowSection(sectionName: string) {
    if (sectionName === 'Request') { return true; }
    if (!this.msr.OperationType) { return false; }

    if (sectionName === 'Personnel/Cargo') {
      return this.msr.OperationType === 'Cargo/Personnel Move';
    } else if (sectionName === 'SAM') {
      return this.msr.OperationType === 'AIR Mobility (SAM)';
    } else if (sectionName === 'ST/BA') {
      return this.msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)';
    }
    return false;
  }
}
