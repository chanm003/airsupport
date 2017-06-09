import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Msr } from '../../shared/msr.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-owner-tabcontent',
  templateUrl: './owner-tabcontent.component.html',
  styles: []
})
export class OwnerTabcontentComponent implements OnInit {
  @Input() msr: Msr;
  @Input() msrOnLoad: Msr;
  @Input() cachedData: any;
  @Output() saveButtonClicked = new EventEmitter<string>();

  constructor() {
   }

  ngOnInit() {
  }

  onSaveButtonClicked(): void {
    this.saveButtonClicked.emit();
  }
}


