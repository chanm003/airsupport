import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';

export class Msr {
    AirfieldLocations?: string;
    AltEmail?: string;
    AltPhone?: string;
    AltPOC?: string;
    AmplifyingDetail?: string;
    CommunicationSupportReqs?: string;    
    CommunicationSupportRequired?: boolean;
    Conop?: string;
    HazmatRequired?: boolean;
    Id?:number;
    IsuType?: string;
    IsuWeight?: number;
    MedicalSupportReqs?: string;
    MedicalSupportRequired?: boolean;
    MissionEnd?: NgbDateStruct;
    MissionStart?: NgbDateStruct;
    NegativeImpact?: string;
    NumberOfPallets?: number;
    NumberOfPAX?: number;
    OperationType?: string;
    PalletWeight?: number;
    PaxBaggageWeight?: number;
    RequesterEmail?: string;
    RequesterPhone?: string;
    RequestingUnit?: any;
    RequestingUnitId?: number;
    SelectedRequesters?: Array<any>;
    constructor(json?: any) {
        if (json) {
            this.setProperties(json);
            console.log(json);
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
        dto.HazmatRequired = this.HazmatRequired;
        dto.MedicalSupportRequired = this.MedicalSupportRequired;

        /*DATETIME*/
        dto.MissionEnd = this.convertToIso(this.MissionEnd);
        dto.MissionStart = this.convertToIso(this.MissionStart);

        /*LOOKUP*/
        dto.RequestingUnitId = this.RequestingUnitId;

        /*NUMBER*/
        dto.IsuWeight = this.IsuWeight;
        dto.NumberOfPallets = this.NumberOfPallets;
        dto.NumberOfPAX = this.NumberOfPAX;
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
        dto.AltEmail = this.AltEmail;
        dto.AltPhone = this.AltPhone;
        dto.AltPOC = this.AltPOC;
        dto.AmplifyingDetail = this.AmplifyingDetail;
        dto.CommunicationSupportReqs = this.CommunicationSupportReqs;
        dto.IsuType = this.IsuType;
        dto.MedicalSupportReqs= this.MedicalSupportReqs;
        dto.NegativeImpact = this.NegativeImpact;
        dto.Conop = this.Conop;
        dto.OperationType = this.OperationType;
        dto.RequesterEmail = this.RequesterEmail;
        dto.RequesterPhone = this.RequesterPhone;

        return dto;
    }

    setProperties(json: any) {
        /*BOOLEAN*/
        this.CommunicationSupportRequired = json.CommunicationSupportRequired;
        this.HazmatRequired = json.HazmatRequired;
        this.MedicalSupportRequired = json.MedicalSupportRequired;

        /*DATETIME*/
        this.MissionEnd = this.convertToBootstrapDate(json.MissionEnd);
        this.MissionStart = this.convertToBootstrapDate(json.MissionStart);

        /*LOOKUP*/
        this.RequestingUnitId = json.RequestingUnit.Id;

        /*NUMBER*/
        this.Id = json.Id;
        this.IsuWeight = json.IsuWeight;
        this.NumberOfPallets = json.NumberOfPallets;
        this.NumberOfPAX = json.NumberOfPAX;
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
        this.AltEmail = json.AltEmail;
        this.AltPhone = json.AltPhone;
        this.AltPOC = json.AltPOC;
        this.AmplifyingDetail = json.AmplifyingDetail;
        this.CommunicationSupportReqs = json.CommunicationSupportReqs;
        this.Conop = json.Conop;
        this.IsuType = json.IsuType;
        this.MedicalSupportReqs = json.MedicalSupportReqs;
        this.NegativeImpact = json.NegativeImpact;
        this.OperationType = json.OperationType;
        this.RequesterEmail = json.RequesterEmail;
        this.RequesterPhone = json.RequesterPhone;
    }
}