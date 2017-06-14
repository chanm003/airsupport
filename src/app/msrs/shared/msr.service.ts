import { Injectable } from '@angular/core';
import { Msr } from '../../msrs/shared/msr.model';
import { ExceptionService } from '../../core/exception.service';
import { PagecontextService } from '../../core/pagecontext.service';
import { CacheddataService } from '../../core/cacheddata.service';

@Injectable()
export class MsrService {
  listName = 'Mission Support Request';
  fieldsToSelect = [
    'AirMobilityType', 'AircraftSecurityRequired', 'AirfieldLocations', 'AltEmail', 'AltPOC', 'AltPhone',
    'AmplifyingDetail', 'AssignedOutsideUnits', 'AssignedSubunits', 'Attachments', 'Author/Title', 'Author/EMail', 'AuthorId',
    'CommunicationSupportReqs', 'CommunicationSupportRequired', 'Conop', 'Created', 'DropZones', 'Editor/Title',
    'EditorId', 'EstimatedDimensionsHeight', 'EstimatedDimensionsLength', 'EstimatedWeight', 'FFEquipment',
    'FastRopeRequired', 'HazmatRequired', 'HoistRequired', 'Id', 'InfillExfillType', 'IsuType', 'IsuWeight',
    'JtacCasType', 'JtacFireType', 'LandingZones', 'MedicalSupportReqs', 'MedicalSupportRequired', 'MissionEnd', 'MissionStart',
    'MissionSupportEnd', 'MissionSupportStart', 'Modified', 'NegativeImpact', 'Notes', 'NumberOfPAX', 'NumberOfPallets',
    'NumberOfPersonnel', 'NumberOfRefuelPointsRequired', 'OperationType', 'OtherAIE', 'OwningUnitsId', 'OwningUnits/Id', 'OwningUnits/Name',
    'PNForces', 'PalletWeight', 'ParachuteType', 'ParachuteTypeOther', 'Pararescue', 'PaxBaggageWeight',
    'Platforms', 'RappelRequired', 'Requester/Id', 'Requester/Title', 'RequesterEmail', 'RequesterPhone', 'RequestingUnit/Id',
    'RequestingUnit/Name', 'RelatedMission', 'StagingLocation', 'Status', 'SupportLocation', 'SupportUnit/Id', 'SupportUnit/Name',
    'Surveys', 'SurveysRequired', 'TargetLocations', 'Title', 'TypeRelease', 'Vehicles', 'VehiclesRequired'
  ];
  fieldsToExpand = ['Author', 'Editor', 'OwningUnits', 'Requester', 'RequestingUnit' , 'SupportUnit'];

  constructor(private exceptionService: ExceptionService,
    private pagecontextService: PagecontextService) {
  }

  create(msr: Msr, permissions) {
    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items.add(msr.createDto(permissions))
    .then(resp => resp.data)
    .catch(reason => console.log(reason));
  }

  update(msr: Msr, permissions) {
    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items.getById(msr.Id).update(msr.createDto(permissions))
    .then(resp => resp.data)
    .catch(reason => console.log(reason));
  }

  updateStatus(statusUpdate: MsrStatusUpdate) {
    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items.getById(statusUpdate.Id).update(statusUpdate.createDto());
  }

  getAll() {
    return this.pagecontextService.getWeb().lists.getByTitle(this.listName).items
      .select(...this.fieldsToSelect)
      .expand(...this.fieldsToExpand)
      .get();
  }

  get(id: number): Promise<Msr> {
    if (!id) {
      return Promise.resolve(null);
    }

    return <Promise<Msr>>this.pagecontextService.getWeb().lists.getByTitle(this.listName).items
      .getById(id)
      .select(...this.fieldsToSelect)
      .expand(...this.fieldsToExpand)
      .get()
      .then(function(res){
        return new Msr(res);
      });
  }
}

export class MsrStatusUpdate {
  Id: number;
  Status: string;
  OwningUnits?: Array<any>;
  OwningUnitsId: Array<number>;
  SupportUnitId?: number;
  SupportUnit?: any;

  createDto() {
    return {
      Status: this.Status,
      OwningUnitsId: (this.OwningUnitsId) ? {results: this.OwningUnitsId} : undefined,
      SupportUnitId: this.SupportUnitId
    };
  }
}
