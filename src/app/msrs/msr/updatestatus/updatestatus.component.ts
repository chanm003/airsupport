import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import { StatusChange } from '../../shared/newsfeed.model';
import * as _ from 'lodash';

import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsfeedService } from '../../shared/newsfeed.service';

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
    notes: ''
  };

  @Input() msr: Msr;
  @Input() cachedData: any;
  checkboxDataSource: Array<any>;

  constructor(private modalService: NgbModal, private newsfeedService: NewsfeedService) { }

  ngOnInit() { }

  openModal(modalContent, selectedStatus) {
    this.formData.status = selectedStatus;
    this.modalRef = this.modalService.open(modalContent);

    this.modalRef.result.then(() => {
      this.formData = {
        status: '',
        notes: ''
      };
    });
  }

  renderOwningUnits(msr: Msr) {
    return _.map(msr.OwningUnitsId, (id: any) => _.find(this.cachedData['owningUnits'], {Id: id}));
  }

  changeStatus() {
    const change = new StatusChange();
    change.Type = 'StatusChange';
    change.RelatedMsrId = this.msr.Id;
    change.JSON = {
      prevStatus: this.msr.Status,
      newStatus: this.formData.status,
      comments: this.formData.notes
    };

    this.newsfeedService.create(change)
      .then((createdItem) => {
        this.msr.NewsfeedItems.push(createdItem);
        this.modalRef.close();
      });
    ;
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
    this.msr.OwningUnitsId = _.map(_.filter(this.checkboxDataSource, { isChecked: true }), 'value');
  }

  onSupportUnitChanged() {
    this.msr.SupportUnit = _.find(this.cachedData.supportUnits, { Id: this.msr.SupportUnitId });
  }
}
