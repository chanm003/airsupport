import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-requester-tabcontent',
  templateUrl: './requester-tabcontent.component.html'
})
export class RequesterTabcontentComponent implements OnInit {
  @Output() saveButtonClicked = new EventEmitter<string>();
  @Input() msr: Msr;
  @Input() msrStatusOnLoad: string;
  @Input() dataEntryLookups: any;
  buttonsManager: any;

  sectionNames: Array<string> = [
    'Personnel/Cargo', 'SAM', 'ST/BA'
  ];

  constructor() { }

  ngOnInit() {
    this.setButtonsLogic();
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

  setButtonsLogic() {
    this.buttonsManager = {
      'Save': {
        shouldShow: () => this.msrStatusOnLoad === '' || this.msrStatusOnLoad === 'Draft',
        onClicked: () => {
          this.msr.Status = 'Draft';
          this.saveButtonClicked.emit();
        }
      },
      'Submit': {
        shouldShow: () => this.msrStatusOnLoad === '' || this.msrStatusOnLoad === 'Draft',
        onClicked: () => {
          this.msr.Status = 'Submitted';
          this.saveButtonClicked.emit();
        }
      },
      'Cancel': {
        shouldShow: () => !!this.msr.Id && _.includes(['Submitted', 'Vetting', 'Assigned', 'Planning', 'Approved'], this.msrStatusOnLoad),
        onClicked: () => {
          this.msr.Status = 'Canceled';
          this.saveButtonClicked.emit();
        }
      },
      'Reopen': {
        shouldShow: () => !!this.msr.Id && this.msrStatusOnLoad !== 'Draft',
        onClicked: () => {
          this.msr.Status = 'Draft';
          this.saveButtonClicked.emit();
        }
      }
    };
  }
}
