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

@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styles: []
})
export class UpdatestatusComponent implements OnInit, OnChanges {
  modalRef: NgbModalRef;
  statuses = ['Vetting', 'Assigned', 'Planning', 'Approved', 'Rejected'];
  formData = {
    status: '',
    notes: '',
    SupportUnitId: null,
    OwningUnitsId: null
  };

  @Input() msr: Msr;
  @Input() cachedData: any;
  checkboxDataSource: Array<any>;

  constructor(private modalService: NgbModal, private msrService: MsrService,
    private newsfeedService: NewsfeedService, private notificationService: NotificationsService, 
    private emailnotificationService: EmailnotificationService) { }

  ngOnInit() { }

  openModal(modalContent, selectedStatus) {
    this.formData.status = selectedStatus;
    this.formData.SupportUnitId = this.msr.SupportUnitId;
    this.formData.OwningUnitsId = this.msr.OwningUnitsId;
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
    this.msr.Status = msrUpdateResult.Status;

    if (msrUpdateResult.OwningUnitsId) {
      this.msr.OwningUnitsId = msrUpdateResult.OwningUnitsId;
      this.msr.OwningUnits = msrUpdateResult.OwningUnits;
    }

    if (msrUpdateResult.SupportUnitId) {
      this.msr.SupportUnitId = msrUpdateResult.SupportUnitId;
      this.msr.SupportUnit = msrUpdateResult.SupportUnit;
    }
  }

  renderOwningUnits(msr: Msr) {
    return _.map(msr.OwningUnitsId, (id: any) => _.find(this.cachedData['owningUnits'], {Id: id}));
  }

  updateStatus() {
    const update = new MsrStatusUpdate();
    update.Id = this.msr.Id;
    update.Status = this.formData.status;
    if (this.formData.status === 'Vetting') {
      update.OwningUnitsId = this.formData.OwningUnitsId;
      update.OwningUnits = _.map(update.OwningUnitsId, (unitId) =>  _.find(this.cachedData.owningUnits, { Id: unitId }));
    }
    if (this.formData.status === 'Assigned') {
      update.SupportUnit = _.find(this.cachedData.supportUnits, { Id: this.formData.SupportUnitId });
      update.SupportUnitId = this.formData.SupportUnitId;
    }

    const changes = MsrTrackedChanges.compare(this.msr, update);
    return this.msrService.updateStatus(update)
      .then(() => this.createNewsfeedItems(changes, this.msr))
      .then((newsfeedItems) => {
        this.refreshParent(update);
        this.msr.NewsfeedItems.push(...newsfeedItems);
        this.emailnotificationService.createFromChangeReport(changes, this.msr);
        this.notificationService.success('Confirmation', 'Your changes were saved');
        this.modalRef.close();
      });
  }

  createNewsfeedItems(changeReport: MsrChangeReport, msr: Msr) {
    return this.newsfeedService.createFromChangeReport(changeReport, msr);
  }

  createNewsfeedItem(): Promise<any> {
    const change = new StatusChange();
    change.Type = 'StatusChange';
    change.RelatedMsrId = this.msr.Id;
    change.JSON = {
      prevStatus: this.msr.Status,
      newStatus: this.formData.status,
      comments: this.formData.notes
    };

    return this.newsfeedService.create(change);
  }

  ngOnChanges() {
    /*Fires when user goes from /msrs/8 to /msrs/9 */
    this.buildCheckboxDataSource();
  }


  buildCheckboxDataSource() {
    this.checkboxDataSource = _.map(this.cachedData['owningUnits'], (opt: any) => {
      return {
        value: opt.Id,
        display: opt.Name,
        isChecked: _.includes(this.msr.OwningUnitsId, opt.Id)
      };
    });
  }

  onCheckboxClicked() {
    this.formData.OwningUnitsId = _.map(_.filter(this.checkboxDataSource, { isChecked: true }), 'value');
  }
}
