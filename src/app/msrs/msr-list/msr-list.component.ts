import { Component, OnInit } from '@angular/core';
import { MsrService } from '../shared/msr.service';

@Component({
  selector: 'app-msr-list',
  templateUrl: './msr-list.component.html',
  styles: []
})
export class MsrListComponent implements OnInit {

  constructor(private msrService: MsrService) { 
    this.msrService.getAll().then(r => console.log(r))
  }

  ngOnInit() {
  }

}
