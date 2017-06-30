import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../../shared/msr.model';

@Component({
  selector: 'app-airmobilityform',
  templateUrl: './airmobilityform.component.html',
  styles: []
})
export class AirmobilityformComponent implements OnInit {
  @Input() msr: Msr;

  showFields = Msr.fieldsLogic;

  constructor() { }

  ngOnInit() {
  }

  parachuteTypeSpecified($event){
    if ($event.target.name === 'ParachuteType') {
      this.msr.ParachuteTypeOther = '';
    } else if ($event.target.name === 'ParachuteTypeOther') {
      this.msr.ParachuteType = '';
    }
  }
}
