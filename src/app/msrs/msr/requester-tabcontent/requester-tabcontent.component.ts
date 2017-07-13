import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import { MainformComponent } from './mainform/mainform.component';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../core/spinner/spinner.service';
import { PrintformService } from '../../../core/printform.service';
import { MissionService } from '../../../core/mission.service';

@Component({
  selector: 'app-requester-tabcontent',
  templateUrl: './requester-tabcontent.component.html'
})
export class RequesterTabcontentComponent implements OnInit {
  @Output() saveButtonClicked = new EventEmitter<string>();
  @Input() msr: Msr;
  @Input() msrOnLoad: Msr;
  @Input() cachedData: any;
  @ViewChild(MainformComponent) mainForm: MainformComponent;
  buttonsManager: any;
  sectionNames: Array<string> = [
    'Personnel/Cargo', 'SAM', 'ST/BA'
  ];
  navigateButtonProps = {};

  constructor(private router: Router, private spinnerService: SpinnerService, private printformService: PrintformService,
    private missionService: MissionService) { }

  ngOnInit() {
    this.setButtonsLogic();
    this.navigateButtonProps = this.missionService.getNavigateToMissionButtonProperties(this.msr.SelectedMissions[0]);
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

  onPrintButtonClicked() {
    this.printformService.printMsr(this.msrOnLoad, this.cachedData, Msr.fieldsLogic, Msr.panelsLogic);
  }

  setButtonsLogic() {
    this.buttonsManager = {
      'Save': {
        shouldShow: () => this.msrOnLoad.Status === '' || this.msrOnLoad.Status === 'Draft',
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
        shouldShow: () => this.msrOnLoad.Status === '' || this.msrOnLoad.Status === 'Draft',
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
        shouldShow: () => !!this.msr.Id && _.includes(['Submitted', 'Vetting', 'Assigned', 'Planning', 'Approved'], this.msrOnLoad.Status),
        onClicked: () => {
          this.msr.Status = 'Canceled';
          this.saveButtonClicked.emit();
        }
      },
      'Reopen': {
        shouldShow: () => !!this.msr.Id && this.msrOnLoad.Status !== 'Draft',
        onClicked: () => {
          this.msr.Status = 'Draft';
          this.saveButtonClicked.emit();
        }
      }
    };
  }
}
