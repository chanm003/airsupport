import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import { StatusChange } from '../../shared/newsfeed.model';
import * as _ from 'lodash';

import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsfeedService } from '../../shared/newsfeed.service';
import { MsrService, MsrStatusUpdate } from '../../shared/msr.service';
import { NewsfeedItem } from '../../shared/newsfeed.model';
import { NotificationsService } from 'angular2-notifications';

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
    private newsfeedService: NewsfeedService, private notificationService: NotificationsService) { }

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

  refreshParent() {
    this.msr.Status = this.formData.status;
    this.msr.OwningUnitsId = this.formData.OwningUnitsId;
    this.msr.SupportUnitId = this.formData.SupportUnitId;
    this.msr.SupportUnit = _.find(this.cachedData.supportUnits, { Id: this.formData.SupportUnitId });
  }

  renderOwningUnits(msr: Msr) {
    return _.map(msr.OwningUnitsId, (id: any) => _.find(this.cachedData['owningUnits'], {Id: id}));
  }

  updateStatus() {
    const update = new MsrStatusUpdate();
    update.Id = this.msr.Id;
    update.OwningUnitsId = this.formData.OwningUnitsId;
    update.Status = this.formData.status;
    update.SupportUnitId = this.formData.SupportUnitId;

    return this.msrService.updateStatus(update)
      .then(() => this.createNewsfeedItem())
      .then((newsfeedItem) => {
        this.refreshParent();
        this.msr.NewsfeedItems.push(newsfeedItem);
        this.notificationService.success('Confirmation', 'Your changes were saved');
        this.modalRef.close();
      });
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
