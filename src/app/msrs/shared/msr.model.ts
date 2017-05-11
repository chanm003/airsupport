import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';
import { StatusChange } from './newsfeed.model';

export class Msr {
    AircraftSecurityRequired?: boolean;
    AirfieldLocations?: string;
    AirMobilityType?: string;
    AltEmail?: string;
    AltPhone?: string;
    AltPOC?: string;
    AmplifyingDetail?: string;
    AssignedOutsideUnits?: Array<AssignedOutsideUnit>;
    AssignedSubunits?: Array<AssignedSubunit>;
    CommunicationSupportReqs?: string;
    CommunicationSupportRequired?: boolean;
    Conop?: string;
    DropZones: Array<DropZone>;
    EstimatedDimensionsHeight?: number;
    EstimatedDimensionsLength?: number;
    EstimatedWeight?: number;
    FastRopeRequired?: string;
    FFEquipment?: string;
    HazmatRequired?: boolean;
    HoistRequired?: boolean;
    Id?: number;
    InfillExfillType?: string;
    IsuType?: string;
    IsuWeight?: number;
    JtacCasType?: string;
    JtacFireType?: string;
    LandingZones?: Array<LandingZone>;
    MedicalSupportReqs?: string;
    MedicalSupportRequired?: boolean;
    MissionEnd?: NgbDateStruct;
    MissionStart?: NgbDateStruct;
    MissionSupportEnd?: NgbDateStruct;
    MissionSupportStart?: NgbDateStruct;
    NegativeImpact?: string;
    Notes?: string;
    NumberOfPallets?: number;
    NumberOfPAX?: number;
    NumberOfPersonnel?: number;
    NumberOfRefuelPointsRequired?: number;
    OperationType?: string;
    OtherAIE?: string;
    OwningUnitsId?: Array<number>;
    PalletWeight?: number;
    ParachuteType?: string;
    ParachuteTypeOther?: string;
    Pararescue?: string;
    PaxBaggageWeight?: number;
    Platforms?: Array<Platform>;
    PNForces?: Array<PNForce>;
    RappelRequired?: boolean;
    RequesterEmail?: string;
    RequesterPhone?: string;
    RequestingUnit?: any;
    RequestingUnitId?: number;
    SelectedRequesters?: Array<any>;
    StagingLocation?: string;
    Status?: string;
    SupportLocation?: string;
    SupportUnit?: any;
    SupportUnitId?: number;
    Surveys?: string;
    SurveysRequired?: boolean;
    TargetLocations?: Array<TargetLocation>;
    TypeRelease?: string;
    Vehicles?: Array<Vehicle>;
    VehiclesRequired?: boolean;
    constructor(json?: any) {
        if (json) {
            this.setProperties(json);
        } else {
            this.Status = '';
            this.AssignedOutsideUnits = [];
            this.AssignedSubunits = [];
            this.DropZones = [];
            this.LandingZones = [];
            this.OwningUnitsId = [];
            this.Platforms = [];
            this.PNForces = [];
            this.TargetLocations = [];
            this.Vehicles = [];
        }
    }

    private convertToBootstrapDate(iso: string): NgbDateStruct {
        const m = moment(iso);
        return {
            month: m.month() + 1,
            day: m.date(),
            year: m.year()
        };
    }

    private convertToIso(dt: NgbDateStruct) {
        if (dt) {
            return `${dt.year}-${dt.month}-${dt.day}`;
        } else {
            return moment().format('YYYY-MM-DD');
        }
    }

    createDto(permissions) {
        const dto: any = {};

        /*BOOLEAN*/
        dto.CommunicationSupportRequired = this.CommunicationSupportRequired;
        dto.FastRopeRequired = this.FastRopeRequired;
        dto.HazmatRequired = this.HazmatRequired;
        dto.HoistRequired = this.HoistRequired;
        dto.MedicalSupportRequired = this.MedicalSupportRequired;
        dto.RappelRequired = this.RappelRequired;
        dto.SurveysRequired = this.SurveysRequired;
        dto.VehiclesRequired = this.VehiclesRequired;

        /*DATETIME*/
        dto.MissionEnd = this.convertToIso(this.MissionEnd);
        dto.MissionStart = this.convertToIso(this.MissionStart);

        /*JSON*/
        dto.DropZones = JSON.stringify(this.DropZones);
        dto.LandingZones = JSON.stringify(this.LandingZones);
        dto.Platforms = JSON.stringify(this.Platforms);
        dto.PNForces = JSON.stringify(this.PNForces);
        dto.TargetLocations = JSON.stringify(this.TargetLocations);
        dto.Vehicles = JSON.stringify(this.Vehicles);

        /*LOOKUP*/
        dto.RequestingUnitId = this.RequestingUnitId;

        if (permissions['JSOAC/JMOC']) {
            dto.SupportUnitId = this.SupportUnitId;
            dto.OwningUnitsId = { results: this.OwningUnitsId };
            dto.Notes = this.Notes;
        }

        if (permissions['Support Unit']) {
            dto.AircraftSecurityRequired = this.AircraftSecurityRequired;
            dto.MissionSupportEnd = this.convertToIso(this.MissionSupportEnd);
            dto.MissionSupportStart = this.convertToIso(this.MissionSupportStart);
            dto.AssignedOutsideUnits = JSON.stringify(this.AssignedOutsideUnits);
            dto.AssignedSubunits = JSON.stringify(this.AssignedSubunits);
            dto.StagingLocation = this.StagingLocation;
            dto.SupportLocation = this.SupportLocation;
        }

        /*NUMBER*/
        dto.EstimatedDimensionsHeight = this.EstimatedDimensionsHeight;
        dto.EstimatedDimensionsLength = this.EstimatedDimensionsLength;
        dto.EstimatedWeight = this.EstimatedWeight;
        dto.IsuWeight = this.IsuWeight;
        dto.NumberOfPallets = this.NumberOfPallets;
        dto.NumberOfPAX = this.NumberOfPAX;
        dto.NumberOfPersonnel = this.NumberOfPersonnel;
        dto.NumberOfRefuelPointsRequired = this.NumberOfRefuelPointsRequired;
        dto.PalletWeight = this.PalletWeight;
        dto.PaxBaggageWeight = this.PaxBaggageWeight;

        /*PERSON OR GROUP*/
        if (this.SelectedRequesters && this.SelectedRequesters.length === 1) {
            dto.RequesterId = this.SelectedRequesters[0].Id;
        } else {
            dto.RequesterId = null;
        }

        /*STRING*/
        dto.AirfieldLocations = this.AirfieldLocations;
        dto.AirMobilityType = this.AirMobilityType;
        dto.AltEmail = this.AltEmail;
        dto.AltPhone = this.AltPhone;
        dto.AltPOC = this.AltPOC;
        dto.AmplifyingDetail = this.AmplifyingDetail;
        dto.CommunicationSupportReqs = this.CommunicationSupportReqs;
        dto.Conop = this.Conop;
        dto.FFEquipment = this.FFEquipment;
        dto.InfillExfillType = this.InfillExfillType;
        dto.IsuType = this.IsuType;
        dto.JtacCasType = this.JtacCasType;
        dto.JtacFireType = this.JtacFireType;
        dto.MedicalSupportReqs = this.MedicalSupportReqs;
        dto.NegativeImpact = this.NegativeImpact;
        dto.OperationType = this.OperationType;
        dto.OtherAIE = this.OtherAIE;
        dto.ParachuteType = this.ParachuteType;
        dto.ParachuteTypeOther = this.ParachuteTypeOther;
        dto.Pararescue = this.Pararescue;
        dto.RequesterEmail = this.RequesterEmail;
        dto.RequesterPhone = this.RequesterPhone;
        dto.Status = this.Status;
        dto.Surveys = this.Surveys;
        dto.TypeRelease = this.TypeRelease;
        return dto;
    }

    private setProperties(json: any) {
        /*BOOLEAN*/
        this.AircraftSecurityRequired = json.AircraftSecurityRequired;
        this.CommunicationSupportRequired = json.CommunicationSupportRequired;
        this.FastRopeRequired = json.FastRopeRequired;
        this.HazmatRequired = json.HazmatRequired;
        this.HoistRequired = json.HoistRequired;
        this.MedicalSupportRequired = json.MedicalSupportRequired;
        this.RappelRequired = json.RappelRequired;
        this.SurveysRequired = json.SurveysRequired;
        this.VehiclesRequired = json.VehiclesRequired;

        /*DATETIME*/
        this.MissionEnd = this.convertToBootstrapDate(json.MissionEnd);
        this.MissionStart = this.convertToBootstrapDate(json.MissionStart);
        this.MissionSupportEnd = this.convertToBootstrapDate(json.MissionSupportEnd);
        this.MissionSupportStart = this.convertToBootstrapDate(json.MissionSupportStart);

        /*JSON*/
        this.AssignedOutsideUnits = JSON.parse(json.AssignedOutsideUnits || '[]');
        this.AssignedSubunits = JSON.parse(json.AssignedSubunits || '[]');
        this.DropZones = JSON.parse(json.DropZones || '[]');
        this.LandingZones = JSON.parse(json.LandingZones || '[]');
        this.Platforms = JSON.parse(json.Platforms || '[]');
        this.PNForces = JSON.parse(json.PNForces || '[]');
        this.TargetLocations = JSON.parse(json.TargetLocations || '[]');
        this.Vehicles = JSON.parse(json.Vehicles || '[]');

        /*LOOKUP*/
        this.RequestingUnitId = json.RequestingUnit.Id;
        this.SupportUnitId = json.SupportUnit.Id;

        /*LOOKUPMULTI*/
        this.OwningUnitsId = json.OwningUnitsId.results;

        /*NUMBER*/
        this.EstimatedDimensionsHeight = json.EstimatedDimensionsHeight;
        this.EstimatedDimensionsLength = json.EstimatedDimensionsLength;
        this.EstimatedWeight = json.EstimatedWeight;
        this.Id = json.Id;
        this.IsuWeight = json.IsuWeight;
        this.NumberOfPallets = json.NumberOfPallets;
        this.NumberOfPAX = json.NumberOfPAX;
        this.NumberOfPersonnel = json.NumberOfPersonnel;
        this.NumberOfRefuelPointsRequired = json.NumberOfRefuelPointsRequired;
        this.PalletWeight = json.PalletWeight;
        this.PaxBaggageWeight = json.PaxBaggageWeight;

        /*PERSON OR GROUP*/
        this.SelectedRequesters = [];
        if (json.Requester && json.Requester.Id) {
            this.SelectedRequesters.push({
                Id: json.Requester.Id,
                Title: json.Requester.Title,
                value: json.Requester.Id,
                display: json.Requester.Title
                });
        }

        /*STRING*/
        this.AirfieldLocations = json.AirfieldLocations;
        this.AirMobilityType = json.AirMobilityType;
        this.AltEmail = json.AltEmail;
        this.AltPhone = json.AltPhone;
        this.AltPOC = json.AltPOC;
        this.AmplifyingDetail = json.AmplifyingDetail;
        this.CommunicationSupportReqs = json.CommunicationSupportReqs;
        this.Conop = json.Conop;
        this.FFEquipment = json.FFEquipment;
        this.InfillExfillType = json.InfillExfillType;
        this.IsuType = json.IsuType;
        this.JtacCasType = json.JtacCasType;
        this.JtacFireType = json.JtacFireType;
        this.MedicalSupportReqs = json.MedicalSupportReqs;
        this.NegativeImpact = json.NegativeImpact;
        this.Notes = json.Notes;
        this.OperationType = json.OperationType;
        this.OtherAIE = json.OtherAIE;
        this.ParachuteType = json.ParachuteType;
        this.ParachuteTypeOther = json.ParachuteTypeOther;
        this.Pararescue = json.Pararescue;
        this.RequesterEmail = json.RequesterEmail;
        this.RequesterPhone = json.RequesterPhone;
        this.StagingLocation = json.StagingLocation;
        this.Status = json.Status;
        this.SupportLocation = json.SupportLocation;
        this.Surveys = json.Surveys;
        this.TypeRelease = json.TypeRelease;
    }

    getChanges(prevMsr: Msr) {
        const changes = [];
        if (this.Status !== prevMsr.Status) {
            const notification = new StatusChange();
            notification.RelatedMsrId = this.Id;
            notification.Type = StatusChange.name;
            notification.JSON = {
                prevStatus: prevMsr.Status,
                newStatus: this.Status
            };
            changes.push(notification);
        }
        return changes;
    }
}

export class PNForce {
    name: string;
    number: number;
    parachuteType: string;
}

export class DropZone {
    name: string;
    surveyRequired: boolean;
}

export class Vehicle {
    type: string;
    quantity: number;
}

export class Platform {
    type: string;
    quantity: number;
}

export class TargetLocation {
    coordinates: string;
    name: string;
    accessPOC: string;
}

export class LandingZone {
    name: string;
    surveyRequired: boolean;
}

export class AssignedOutsideUnit {
    name: string;
    pocName: string;
    pocPhone: string;
    pocEmail: string;
    platforms: Array<Platform>;
}

export class AssignedSubunit {
    subunitId?: number;
    platforms: Array<Platform>;
}
