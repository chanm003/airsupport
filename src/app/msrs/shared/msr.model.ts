import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';

export class Msr {
    AirfieldLocations?: string;
    AltEmail?: string;
    AltPhone?: string;
    AltPOC?: string;
    CommunicationSupportReqs?: string;    
    CommunicationSupportRequired?: boolean;
    Conop?: string;
    Id?:number;
    MedicalSupportReqs?: string;
    MedicalSupportRequired?: boolean;
    MissionEnd?: NgbDateStruct;
    MissionStart?: NgbDateStruct;
    NegativeImpact?: string;
    OperationType?: string;
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
        dto.MedicalSupportRequired = this.MedicalSupportRequired;

        /*DATETIME*/
        dto.MissionEnd = this.convertToIso(this.MissionEnd);
        dto.MissionStart = this.convertToIso(this.MissionStart);

        /*LOOKUP*/
        dto.RequestingUnitId = this.RequestingUnitId;

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
        dto.CommunicationSupportReqs = this.CommunicationSupportReqs;
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
        this.MedicalSupportRequired = json.MedicalSupportRequired;

        /*DATETIME*/
        this.MissionEnd = this.convertToBootstrapDate(json.MissionEnd);
        this.MissionStart = this.convertToBootstrapDate(json.MissionStart);

        /*LOOKUP*/
        this.RequestingUnitId = json.RequestingUnit.Id;

        /*NUMBER*/
        this.Id = json.Id;

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
        this.CommunicationSupportReqs = json.CommunicationSupportReqs;
        this.Conop = json.Conop;
        this.MedicalSupportReqs = json.MedicalSupportReqs;
        this.NegativeImpact = json.NegativeImpact;
        this.OperationType = json.OperationType;
        this.RequesterEmail = json.RequesterEmail;
        this.RequesterPhone = json.RequesterPhone;
    }
}