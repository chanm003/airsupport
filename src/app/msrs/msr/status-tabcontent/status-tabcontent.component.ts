import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import { StatusChange } from '../../shared/newsfeed.model';
import * as _ from 'lodash';

import {NgbModal, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NewsfeedService } from '../../shared/newsfeed.service';

@Component({
  selector: 'app-status-tabcontent',
  templateUrl: './status-tabcontent.component.html',
  styles: []
})
export class StatusTabcontentComponent implements OnInit {
  modalRef: NgbModalRef;
  statuses = ['Submitted', 'Vetting', 'Assigned', 'Planning', 'Approved', 'Rejected'];
  formData = {
    status: '',
    notes: ''
  };

  @Input() msr: Msr;

  constructor(private modalService: NgbModal, private newsfeedService: NewsfeedService) { }

  ngOnInit() {}

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

  changeStatus(){
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
}
