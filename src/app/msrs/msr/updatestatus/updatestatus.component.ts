import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Msr, MsrTrackedChanges, MsrChangeReport } from '../../shared/msr.model';
import { StatusChange } from '../../shared/newsfeed.model';
import * as _ from 'lodash';

import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsfeedService } from '../../shared/newsfeed.service';
import { MsrService, MsrStatusUpdate } from '../../shared/msr.service';
import { NewsfeedItem } from '../../shared/newsfeed.model';
import { NotificationsService } from 'angular2-notifications';
import { EmailnotificationService } from '../../shared/emailnotification.service';
import { SpinnerService } from '../../../core/spinner/spinner.service';

@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styles: []
})
export class UpdatestatusComponent implements OnInit {
  modalRef: NgbModalRef;
  statuses = ['Vetting', 'Assigned', 'Planning', 'Approved', 'Rejected'];
  formData = {
    status: '',
    notes: '',
    SupportUnitId: null,
    OwningUnitsId: null
  };

  @Input() msr: Msr;
  @Input() msrOnLoad: Msr;
  @Input() cachedData: any;

  constructor(private modalService: NgbModal, private msrService: MsrService,
    private newsfeedService: NewsfeedService, private notificationService: NotificationsService,
    private spinnerService: SpinnerService,
    private emailnotificationService: EmailnotificationService) { }

  ngOnInit() { }

  openModal(modalContent, selectedStatus) {
    this.formData.status = selectedStatus;
    this.formData.SupportUnitId = this.msr.SupportUnitId;
    this.formData.OwningUnitsId = _.map(this.msr.OwningUnitsId, id => String(id));
    this.modalRef = this.modalService.open(modalContent);

    this.modalRef.result.then(
      () => {
        this.clearForm();
      }, (reason) => {
        this.clearForm();
      });
  }

  clearForm() {
    this.formData.notes = '';
  }

  refreshParent(msrUpdateResult: MsrStatusUpdate) {
    _.each(['Status', 'OwningUnits', 'OwningUnitsId', 'SupportUnitId', 'SupportUnit'], (propName) => {
      if(msrUpdateResult[propName]){
        this.msr[propName] = msrUpdateResult[propName];
        this.msrOnLoad[propName] = msrUpdateResult[propName];
      }
    });
  }

  renderOwningUnits(msr: Msr) {
    return _.map(msr.OwningUnitsId, (id: any) => _.find(this.cachedData['owningUnits'], {Id: id}));
  }

  updateStatus() {
    const update = new MsrStatusUpdate();
    update.Id = this.msr.Id;
    update.Status = this.formData.status;
    update.SelectedMissions = this.msr.SelectedMissions;
    if (this.formData.status === 'Vetting') {
      update.OwningUnitsId = _.map(this.formData.OwningUnitsId, id => { return +id; });
      update.OwningUnits = _.map(update.OwningUnitsId, (unitId) =>  _.find(this.cachedData.owningUnits, { Id: unitId }));
    }
    if (this.formData.status === 'Assigned') {
      update.SupportUnit = _.find(this.cachedData.supportUnits, { Id: this.formData.SupportUnitId });
      update.SupportUnitId = this.formData.SupportUnitId;
    }

    const changes = MsrTrackedChanges.compare(this.msr, update);
    if (changes['StatusChange']) {
      changes['StatusChange'].JSON.comments = this.formData.notes;
    }
    this.spinnerService.show();
    return this.msrService.updateStatus(update)
      .then(() => this.createNewsfeedItems(changes, this.msr))
      .then((newsfeedItems) => {
        this.refreshParent(update);
        this.msr.NewsfeedItems.push(...newsfeedItems);
        this.emailnotificationService.createFromChangeReport(changes, this.msr);
        this.spinnerService.hide();
        this.notificationService.success('Confirmation', 'Your changes were saved');
        this.modalRef.close();
      });
  }

  createNewsfeedItems(changeReport: MsrChangeReport, msr: Msr) {
    return this.newsfeedService.createFromChangeReport(changeReport, msr);
  }
}
