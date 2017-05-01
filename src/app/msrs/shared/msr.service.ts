import { Injectable } from '@angular/core';
import { Msr } from '../../msrs/shared/msr.model';
import { ExceptionService } from '../../core/exception.service';
import { PagecontextService } from '../../core/pagecontext.service';
import { DatatentrylookupsService } from '../../core/datatentrylookups.service';

@Injectable()
export class MsrService {
  listName = 'Mission Support Request';
  fieldsToSelect = [
    'AirMobilityType', 'AircraftSecurityRequired', 'AirfieldLocations', 'AltEmail', 'AltPOC', 'AltPhone',
    'AmplifyingDetail', 'AssignedOutsideUnits', 'AssignedSubunits', 'Attachments', 'Author/Title', 'AuthorId',
    'CommunicationSupportReqs', 'CommunicationSupportRequired', 'Conop', 'Created', 'DropZones', 'Editor/Title',
    'EditorId', 'EstimatedDimensionsHeight', 'EstimatedDimensionsLength', 'EstimatedWeight', 'FFEquipment',
    'FastRopeRequired', 'HazmatRequired', 'HoistRequired', 'Id', 'InfillExfillType', 'IsuType', 'IsuWeight',
    'JtacCasType', 'JtacFireType', 'LandingZones', 'MedicalSupportReqs', 'MedicalSupportRequired', 'MissionEnd', 'MissionStart',
    'MissionSupportEnd', 'MissionSupportStart', 'Modified', 'NegativeImpact', 'Notes', 'NumberOfPAX', 'NumberOfPallets',
    'NumberOfPersonnel', 'NumberOfRefuelPointsRequired', 'OperationType', 'OtherAIE', 'OwningUnits/Id', 'OwningUnits/Name',
    'PNForces', 'PalletWeight', 'ParachuteType', 'ParachuteTypeOther', 'Pararescue', 'PaxBaggageWeight',
    'Platforms', 'RappelRequired', 'Requester/Id', 'Requester/Title', 'RequesterEmail', 'RequesterPhone', 'RequestingUnit/Id',
    'RequestingUnit/Name', 'StagingLocation', 'Status', 'SupportLocation', 'SupportUnit/Id', 'SupportUnit/Name', 'Surveys',
    'SurveysRequired', 'TargetLocations', 'Title', 'TypeRelease', 'Vehicles', 'VehiclesRequired'
  ];
  fieldsToExpand = ['Author', 'Editor', 'OwningUnits', 'Requester', 'RequestingUnit' , 'SupportUnit'];

  constructor(private exceptionService: ExceptionService,
    private pagecontextService: PagecontextService) {
  }

  getAll() {
    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items
      .select(...this.fieldsToSelect)
      .expand(...this.fieldsToExpand)
      .get();
  }

  get(id:number){
    if(!id){
      return Promise.resolve(null);
    }

    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items
      .getById(id)
      .select(...this.fieldsToSelect)
      .expand(...this.fieldsToExpand)
      .get();
  }
}
