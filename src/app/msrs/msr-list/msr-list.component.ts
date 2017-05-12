import { Component, OnInit } from '@angular/core';
import { MsrService } from '../shared/msr.service';

@Component({
  selector: 'app-msr-list',
  templateUrl: './msr-list.component.html',
  styles: []
})
export class MsrListComponent implements OnInit {
  msrList: Array<any>;

  constructor(private msrService: MsrService) {
  }

  ngOnInit() {
    this.msrService.getAll().then(data => this.msrList = data);
  }

}
