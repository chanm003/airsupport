import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../../shared/msr.model';

@Component({
  selector: 'app-airmobilityform',
  templateUrl: './airmobilityform.component.html',
  styles: []
})
export class AirmobilityformComponent implements OnInit {
  @Input() msr: Msr;
  constructor() { }

  ngOnInit() {
  }

}
