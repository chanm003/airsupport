import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Msr } from '../shared/msr.model';

@Component({
  selector: 'app-msr',
  templateUrl: './msr.component.html',
  styles: []
})
export class MsrComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { msr: Msr }) => {
      console.log(data.msr);
    });
  }

}
