import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import { MainformComponent } from './mainform/mainform.component';
 import { MissionService } from '../../../core/mission.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-requester-tabcontent',
  templateUrl: './requester-tabcontent.component.html'
})
export class RequesterTabcontentComponent implements OnInit {
  @Output() saveButtonClicked = new EventEmitter<string>();
  @Input() msr: Msr;
  @Input() msrStatusOnLoad: string;
  @Input() cachedData: any;
  @ViewChild(MainformComponent) mainForm: MainformComponent;
  buttonsManager: any;
  isLinkedWithMission = false;
  getMatchingMissions = this.missionService.search;
  sectionNames: Array<string> = [
    'Personnel/Cargo', 'SAM', 'ST/BA'
  ];

  constructor(private missionService: MissionService) { }

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

  hasLinkedMission() {
    return !!this.msr.Id || this.isLinkedWithMission;
  }

  nextButtonClicked() {
    this.isLinkedWithMission = true;
  }

  setButtonsLogic() {
    this.buttonsManager = {
      'Save': {
        shouldShow: () => this.msrStatusOnLoad === '' || this.msrStatusOnLoad === 'Draft',
        onClicked: () => {
          this.mainForm.makeFieldOptional('Conop');
          this.mainForm.markFormDirty();
          if (this.mainForm.isValid()) {
            this.msr.Status = 'Draft';
            this.saveButtonClicked.emit();
          }
        }
      },
      'Submit': {
        shouldShow: () => this.msrStatusOnLoad === '' || this.msrStatusOnLoad === 'Draft',
        onClicked: () => {
          this.mainForm.makeFieldRequired('Conop');
          this.mainForm.markFormDirty();
          if (this.mainForm.isValid()) {
            this.msr.Status = 'Submitted';
            this.saveButtonClicked.emit();
          }
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
