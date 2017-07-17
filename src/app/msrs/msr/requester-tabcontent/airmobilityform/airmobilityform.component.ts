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
  showPanels = Msr.panelsLogic;

  constructor() { }

  ngOnInit() {
  }

  parachuteTypeSpecified($event){
    if ($event.target.name === 'ParachuteMFF' || $event.target.name === 'ParachuteStaticLine') {
      this.msr.ParachuteTypeOther = '';
    } else if ($event.target.name === 'ParachuteTypeOther') {
      this.msr.ParachuteMFF = '';
      this.msr.ParachuteStaticLine = '';
    }
  }
}
