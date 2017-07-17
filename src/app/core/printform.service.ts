import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { PagecontextService } from './pagecontext.service';

declare var jsPDF: any;

@Injectable()
export class PrintformService {
  constructor(private pagecontextService: PagecontextService) {}
  private getAIETypes(msr) {
    const types: Array<string> = [];
    if (msr.HoistRequired) { types.push('Hoist'); }
    if (msr.FastRopeRequired) { types.push('Fast Rope/FRIES'); }
    if (msr.RappelRequired) { types.push('Rappel'); }
    if (msr.OtherAIE) { types.push(msr.OtherAIE); }
    return types.join('; ');
  }

  printMsr(msr, lookups, showFieldsLogic, showPanelsLogic) {
    msr.aieTypesDelimited = this.getAIETypes(msr);
    msr.RequestingUnit =  _.find(lookups.requestingUnits, {Id: msr.RequestingUnitId});
    msr.SupportUnit =  _.find(lookups.supportUnits, {Id: msr.SupportUnitId});
    msr.OwningUnits = _.map(msr.OwningUnitsId, (item) => _.find(lookups.owningUnits, {Id: item}));
    if (msr.SupportUnit) {
      _.each(msr.AssignedSubunits, (item) => item.subunit = _.find(msr.SupportUnit.Subunits, {Id: item.subunitId}));
    }

    const doc = new jsPDF();
    doc.text('Mission Support Request System', 14, 16);

    const columns = [
      {title: 'name', dataKey: 'name'},
      {title: 'value', dataKey: 'value'}
    ];

    const nameValueTableDrawingOptions = {
      bodyStyles: {valign: 'top'},
      styles: {overflow: 'linebreak', columnWidth: 'wrap'},
      showHeader: 'never',
      theme: 'grid',
      columnStyles: {name: {fontStyle: 'bold'}, value: {columnWidth: 'auto'}}
    };

    const mainRows = [];
    const missionStart = `${msr.MissionStart.month}/${msr.MissionStart.day}/${msr.MissionStart.year}`;
    const missionEnd = `${msr.MissionEnd.month}/${msr.MissionEnd.day}/${msr.MissionEnd.year}`;
    mainRows.push({name: 'Mission', value: msr.SelectedMissions[0].Title});
    mainRows.push({name: 'Status', value: msr.Status});
    mainRows.push({name: 'Operation Type', value: msr.OperationType});
    mainRows.push({name: 'Dates', value: `${missionStart} - ${missionEnd}`});
    mainRows.push({name: 'CONOP', value: msr.Conop || ''});
    mainRows.push({name: 'Airfields/Locations', value: msr.AirfieldLocations || ''});
    mainRows.push({name: 'Impact if not supported', value: msr.NegativeImpact || ''});
    mainRows.push({name: 'Medical Requirements', value: (msr.MedicalSupportRequired) ? msr.MedicalSupportReqs : ''});
    mainRows.push({name: 'Communications Requirements', value: (msr.CommunicationSupportRequired) ? msr.CommunicationSupportReqs : ''});
    doc.autoTable(columns, mainRows, _.extend({}, nameValueTableDrawingOptions, {startY: 20}));

    const opTypeSpecificRows = [];
    if (msr.OperationType === 'Cargo/Personnel Move') {
      doc.text('Cargo/Personnel Move', 14, doc.autoTable.previous.finalY + 10);
      opTypeSpecificRows.push({name: '#PAX', value: msr.NumberOfPAX || ''});
      opTypeSpecificRows.push({name: 'PAX Baggage Wegiht', value: `${msr.PaxBaggageWeight} lbs` || ''});
      opTypeSpecificRows.push({name: '#Pallets', value: msr.NumberOfPallets || ''});
      opTypeSpecificRows.push({name: 'Pallet Weight', value: `${msr.PalletWeight} lbs` || ''});
      opTypeSpecificRows.push({name: '#ISU/Type', value: msr.IsuType || ''});
      opTypeSpecificRows.push({name: 'ISU Weight', value: `${msr.IsuWeight} lbs` || ''});
      opTypeSpecificRows.push({name: 'HAXMAT Required', value: (msr.HazmatRequired) ? 'Yes' : 'No'});
      opTypeSpecificRows.push({name: 'Amplifying Detail', value: msr.AmplifyingDetail || ''});
    }

    if (msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)') {
      doc.text('Special Tactics/Battlefield Airman', 14, doc.autoTable.previous.finalY + 10);
      opTypeSpecificRows.push({name: 'JTAC/CAS', value: (`${msr.JtacCasType} ` || '') + (msr.JtacFireType || '')});
      opTypeSpecificRows.push({name: 'Pararescue', value: msr.Pararescue || ''});
      opTypeSpecificRows.push({name: 'Surveys', value: msr.Surveys || ''});
    }

    if (msr.OperationType === 'AIR Mobility (SAM)') {
      doc.text('AIR Mobility', 14, doc.autoTable.previous.finalY + 10);
      const infillExfillType = (showFieldsLogic['InfillExfillType'](msr) && msr.InfillExfillType) ? `(${msr.InfillExfillType})` : '';
      opTypeSpecificRows.push({name: 'Type', value: `${msr.AirMobilityType} ${infillExfillType}`});

      if (showFieldsLogic['NumberOfPersonnel'](msr)) {
        opTypeSpecificRows.push({name: '# Personnel', value: msr.NumberOfPersonnel || ''});
      }

      if (showPanelsLogic['ParachuteFields'](msr)) {
        if (showFieldsLogic['ParachuteMFF'](msr)) {
          opTypeSpecificRows.push({name: 'Parachute Type', value: msr.ParachuteMFF || msr.ParachuteTypeOther || '' });
        }
        if (showFieldsLogic['ParachuteStaticLine'](msr)) {
          opTypeSpecificRows.push({name: 'Parachute Type', value: msr.ParachuteStaticLine || msr.ParachuteTypeOther || '' });
        }
      }

      if (showFieldsLogic['TypeRelease'](msr)) {
        opTypeSpecificRows.push({name: 'Type Release', value: msr.TypeRelease || ''});
      }

      if (showFieldsLogic['FFEquipment'](msr)) {
        opTypeSpecificRows.push({name: 'FF Equipment', value: msr.FFEquipment || ''});
      }

      if (showFieldsLogic['AIE_related_fields'](msr)) {
        opTypeSpecificRows.push({name: 'AIE Types', value: msr.aieTypesDelimited || ''});
      }

      if (showFieldsLogic['RAPIDS_related_fields'](msr)) {
        opTypeSpecificRows.push({name: 'Vehicles Required', value: (msr.VehiclesRequired) ? 'Yes' : 'No'});
        opTypeSpecificRows.push({name: 'Surveys Required', value: (msr.SurveysRequired) ? 'Yes' : 'No'});
      }

      if (showFieldsLogic['EstimatedDimensionsWeight'](msr)) {
        opTypeSpecificRows.push({name: 'Estimated Height', value: `${msr.EstimatedDimensionsHeight} inches` || ''});
        opTypeSpecificRows.push({name: 'Estimated Length', value: `${msr.EstimatedDimensionsLength} inches` || ''});
        opTypeSpecificRows.push({name: 'Estimated Weight', value: `${msr.EstimatedWeight} lbs` || ''});
      }

      if (showFieldsLogic['NumberOfRefuelPointsRequired'](msr)) {
        opTypeSpecificRows.push({name: '# of Refuel Points', value: msr.NumberOfRefuelPointsRequired || ''});
      }
    }

    if (opTypeSpecificRows.length) {
      doc.autoTable(columns, opTypeSpecificRows, _.extend({}, nameValueTableDrawingOptions, {startY: doc.autoTable.previous.finalY + 14}));
    }

    const subTableOptions = { theme: 'grid', headerStyles: {fillColor: 0}};

    if (showPanelsLogic['PNForces'](msr)) {
      const columnsSubTable = [
        {title: 'PN Force', dataKey: 'name'},
        {title: 'PAX', dataKey: 'number'},
        {title: 'Parachute', dataKey: 'parachuteType'}
      ];
      doc.autoTable(columnsSubTable, msr.PNForces, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
    }

    if (showPanelsLogic['DropZones'](msr)) {
      const columnsSubTable = [
        {title: 'Drop Zone', dataKey: 'name'},
        {title: 'Survey Required', dataKey: 'yesNo'}
      ];
      const zones = _.map(msr.DropZones, (item: any) => {
        item.yesNo = item.surveyRequired ? 'Yes' : 'No';
        return item;
      });
      doc.autoTable(columnsSubTable, zones, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
    }

    if (showPanelsLogic['Vehicles'](msr)) {
      const columnsSubTable = [
        {title: 'Vehicle', dataKey: 'type'},
        {title: 'Quantity', dataKey: 'quantity'}
      ];
      doc.autoTable(columnsSubTable, msr.Vehicles, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
    }

    if (showPanelsLogic['Platforms'](msr)) {
      const columnsSubTable = [
        {title: 'Platform', dataKey: 'type'},
        {title: 'Quantity', dataKey: 'quantity'}
      ];
      doc.autoTable(columnsSubTable, msr.Platforms, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
    }

    if (showPanelsLogic['TargetLocations'](msr)) {
      const columnsSubTable = [
        {title: 'Target Location', dataKey: 'name'},
        {title: 'LAT/LNG', dataKey: 'coords'},
        {title: 'Access POC', dataKey: 'accessPOC'},
      ];
      const locations = _.map(msr.TargetLocations, (item: any) => {
        item.coords = (item.lat && item.long) ? `${item.lat}, ${item.long}` : '';
        return item;
      });
      doc.autoTable(columnsSubTable, locations, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
    }

    if (showPanelsLogic['LandingZones'](msr)) {
      const columnsSubTable = [
        {title: 'Landing Zone', dataKey: 'name'},
        {title: 'Survey Required', dataKey: 'yesNo'}
      ];
      const zones = _.map(msr.LandingZones, (item: any) => {
        item.yesNo = item.surveyRequired ? 'Yes' : 'No';
        return item;
      });
      doc.autoTable(columnsSubTable, zones, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
    }

    doc.text('Requested By', 14, doc.autoTable.previous.finalY + 10);
    const requesterRows = [];
    requesterRows.push({name: 'Unit', value: `${msr.RequestingUnit.Name}\n${msr.RequestingUnit.PhoneNumber}\n${msr.RequestingUnit.Email}`});
    requesterRows.push({name: 'Requester', value: `${msr.SelectedRequesters[0].Title}\n${msr.RequesterPhone}\n${msr.RequesterEmail}`});
    const altPoc = _.map([msr.AltPOC, msr.AltPhone, msr.AltEmail], (item: any) => {
      return item || '';
    }).join('\n');
    requesterRows.push({name: 'Alternate POC', value: altPoc});
    doc.autoTable(columns, requesterRows, _.extend({}, nameValueTableDrawingOptions, {startY: doc.autoTable.previous.finalY + 14}));

    if (msr.OwningUnits.length) {
      doc.text('Owned By', 14, doc.autoTable.previous.finalY + 10);
      const rows = [];
      rows.push({name: 'Unit', value: _.map(msr.OwningUnits, 'Name').join('; ')});
      doc.autoTable(columns, rows, _.extend({}, nameValueTableDrawingOptions, {startY: doc.autoTable.previous.finalY + 14}));
    }

    if (msr.SupportUnit) {
      doc.text('Supported By', 14, doc.autoTable.previous.finalY + 10);
      const rows = [];
      rows.push({name: 'Unit', value: `${msr.SupportUnit.Name}\n${msr.SupportUnit.PhoneNumber}\n${msr.SupportUnit.Email}`});
      if (!!msr.MissionSupportStart && !!msr.MissionSupportEnd) {
        const start = `${msr.MissionSupportStart.month}/${msr.MissionSupportStart.day}/${msr.MissionSupportStart.year}`;
        const end = `${msr.MissionSupportEnd.month}/${msr.MissionSupportEnd.day}/${msr.MissionSupportEnd.year}`;
        rows.push({name: 'Dates', value: `${start} - ${end}`});
      }
      rows.push({name: 'Location', value: msr.SupportLocation || ''});
      const aircraftSecurity = (msr.AircraftSecurityRequired) ? 'Yes' : 'No';
      const stagingLocation = (msr.AircraftSecurityRequired && msr.StagingLocation) ? ', Staging Location: ' + msr.StagingLocation : '';
      rows.push({name: 'Aircraft Security', value: aircraftSecurity + stagingLocation});
      doc.autoTable(columns, rows, _.extend({}, nameValueTableDrawingOptions, {startY: doc.autoTable.previous.finalY + 14}));

      if (msr.AssignedSubunits.length) {
        const columnsSubTable = [
          {title: 'Assigned Subunit', dataKey: 'contactInfo'},
          {title: 'Platforms', dataKey: 'platformInfo'}
        ];
        const units = _.map(msr.AssignedSubunits, (item: any) => {
          item.contactInfo = (item.subunit) ? `${item.subunit.Name}\n${item.subunit.PocName}\n${item.subunit.PocPhone}` : '';
          item.platformInfo =
            _.map(item.platforms, (platform: any) => {
              return `${platform.type}\nQuantity: ${platform.quantity}`;
            }).join('\n\n');
          return item;
        });
        doc.autoTable(columnsSubTable, units, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
      }

      if (msr.AssignedOutsideUnits.length) {
        const columnsSubTable = [
          {title: 'Assigned Outside Unit', dataKey: 'contactInfo'},
          {title: 'Platforms', dataKey: 'platformInfo'}
        ];
        const units = _.map(msr.AssignedOutsideUnits, (item: any) => {
          item.contactInfo = `${item.name}\n${item.pocName}\n${item.pocPhone}\n${item.pocEmail}`;
          item.platformInfo =
            _.map(item.platforms, (platform: any) => {
              return `${platform.type}\nQuantity: ${platform.quantity}`;
            }).join('\n\n');
          return item;
        });
        doc.autoTable(columnsSubTable, units, _.extend({}, subTableOptions, {startY: doc.autoTable.previous.finalY + 7}));
      }
    }

    const generated = moment();
    const fileName = `MSR${msr.Id}-${generated.format('YYYYMMDDHHmm')}.pdf`;
    const url = `${this.pagecontextService.getInfo().currentWebAbsoluteUrl}/index.aspx#/msrs/${msr.Id}`;

    doc.setFontSize(11);
    doc.text(`Generated by MSRS: ${generated.format('LLL')}\n${url}`, 14, doc.autoTable.previous.finalY + 10);

    doc.output('dataurlnewwindow');
    //doc.save(fileName);
  }
}
