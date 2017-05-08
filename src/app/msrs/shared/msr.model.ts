import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';

export class Msr {
    AirfieldLocations?: string;
    AirMobilityType?: string;
    AltEmail?: string;
    AltPhone?: string;
    AltPOC?: string;
    AmplifyingDetail?: string;
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
    Id?:number;
    InfillExfillType?: string;
    IsuType?: string;
    IsuWeight?: number;
    JtacCasType?: string;
    JtacFireType?: string;
    MedicalSupportReqs?: string;
    MedicalSupportRequired?: boolean;
    MissionEnd?: NgbDateStruct;
    MissionStart?: NgbDateStruct;
    NegativeImpact?: string;
    NumberOfPallets?: number;
    NumberOfPAX?: number;
    NumberOfPersonnel?: number;
    NumberOfRefuelPointsRequired?: number;
    OperationType?: string;
    OtherAIE?: string;
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
    Surveys?: string;
    SurveysRequired?: boolean;
    TypeRelease?: string;
    Vehicles?: Array<Vehicle>;
    VehiclesRequired?: boolean;
    constructor(json?: any) {
        if (json) {
            this.setProperties(json);
            console.log(json);
        } else {
            this.DropZones = [];
            this.Platforms = [];
            this.PNForces = [];
            this.Vehicles = [];
        }
    }

    convertToBootstrapDate(iso: string): NgbDateStruct{
        const m = moment(iso);
        return {
            month: m.month() + 1,
            day: m.date(),
            year: m.year()
        }
    }

    convertToIso(dt: NgbDateStruct) {
        if( dt ){
            return `${dt.year}-${dt.month}-${dt.day}`;
        } else {
            return moment().format('YYYY-MM-DD'); 
        }
    }

    createDto() {
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
        dto.Platforms = JSON.stringify(this.Platforms);
        dto.PNForces = JSON.stringify(this.PNForces);
        dto.Vehicles = JSON.stringify(this.Vehicles);

        /*LOOKUP*/
        dto.RequestingUnitId = this.RequestingUnitId;

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
        dto.MedicalSupportReqs= this.MedicalSupportReqs;
        dto.NegativeImpact = this.NegativeImpact;
        dto.OperationType = this.OperationType;
        dto.OtherAIE = this.OtherAIE;
        dto.ParachuteType = this.ParachuteType;
        dto.ParachuteTypeOther = this.ParachuteTypeOther;
        dto.Pararescue = this.Pararescue;
        dto.RequesterEmail = this.RequesterEmail;
        dto.RequesterPhone = this.RequesterPhone;
        dto.Surveys = this.Surveys;
        dto.TypeRelease = this.TypeRelease;
        return dto;
    }

    setProperties(json: any) {
        /*BOOLEAN*/
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

        /*JSON*/
        this.DropZones = JSON.parse(json.DropZones);
        this.Platforms = JSON.parse(json.Platforms);
        this.PNForces = JSON.parse(json.PNForces);
        this.Vehicles = JSON.parse(json.Vehicles);

        /*LOOKUP*/
        this.RequestingUnitId = json.RequestingUnit.Id;

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
        this.OperationType = json.OperationType;
        this.OtherAIE = json.OtherAIE;
        this.ParachuteType = json.ParachuteType;
        this.ParachuteTypeOther = json.ParachuteTypeOther;
        this.Pararescue = json.Pararescue;
        this.RequesterEmail = json.RequesterEmail;
        this.RequesterPhone = json.RequesterPhone;
        this.Surveys = json.Surveys;
        this.TypeRelease = json.TypeRelease;
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
