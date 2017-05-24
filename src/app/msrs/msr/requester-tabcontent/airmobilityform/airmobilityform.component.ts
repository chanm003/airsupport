import { Component, OnInit, Input } from '@angular/core';
import { Msr } from '../../../shared/msr.model';

@Component({
  selector: 'app-airmobilityform',
  templateUrl: './airmobilityform.component.html',
  styles: []
})
export class AirmobilityformComponent implements OnInit {
  @Input() msr: Msr;

  showFields = {
    'AIE_related_fields': function(msr){
      return msr.AirMobilityType === 'Infill/Exfill' && msr.InfillExfillType === 'AIEs';
    },
    'EstimatedDimensionsWeight': function(msr){
      return msr.AirMobilityType === 'Equipment Drop';
    },
    'FFEquipment': function(msr){
      if (msr.AirMobilityType === 'Infill/Exfill') {
        return msr.InfillExfillType === 'MFF' || msr.InfillExfillType === 'Static Line';
      }

      return false;
    },
    'InfillExfillType': function(msr){
      return msr.AirMobilityType === 'Infill/Exfill';
    },
    'NumberOfPersonnel': function(msr){
      return msr.AirMobilityType === 'Infill/Exfill';
    },
    'NumberOfRefuelPointsRequired': function(msr){
      return msr.AirMobilityType === 'FARP';
    },
    'ParachuteType': function(msr){
      if (msr.AirMobilityType === 'Infill/Exfill') {
        return msr.InfillExfillType === 'MFF' || msr.InfillExfillType === 'Static Line';
      }

      return false;
    },
    'RAPIDS_related_fields': function(msr){
      return msr.AirMobilityType === 'Infill/Exfill' && msr.InfillExfillType === 'RAPIDS';
    },
    'TypeRelease': function(msr){
      if (msr.AirMobilityType === 'Equipment Drop') { return true; }

      if (msr.AirMobilityType === 'Infill/Exfill') {
        return msr.InfillExfillType === 'MFF' || msr.InfillExfillType === 'Static Line';
      }

      return false;
    }
  }

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
