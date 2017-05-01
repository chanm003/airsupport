import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';

@Component({
  selector: 'app-requester-tabcontent',
  templateUrl: './requester-tabcontent.component.html',
  styles: []
})
export class RequesterTabcontentComponent implements OnInit {
  @Output() saveButtonClicked = new EventEmitter<string>();
  @Input() msr: Msr;

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

  constructor() { }

  ngOnInit() {
  }

  onSaveButtonClicked():void{
    this.saveButtonClicked.emit('request');
  }

  shouldShowSection(sectionName: string){
    /*
    if (sectionName === 'Request') {
      return true;
    } else if (sectionName === 'Personnel/Cargo'){
      return this.msr.OperationType === 'Cargo/Personnel Move';
    } else if (sectionName === 'SAM'){
      return this.msr.OperationType === 'AIR Mobility (SAM)';
    } else if (sectionName === 'ST/BA'){
      return 'Special Tactics/Battlefield Airman (ST/BAO)';
    }
    */
    return false;
  }
}
