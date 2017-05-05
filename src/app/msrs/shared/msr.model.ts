import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';

export class Msr {
    Conop?: string;
    MissionEnd?: NgbDateStruct;
    MissionStart?: NgbDateStruct;
    OperationType?: string;
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
        return `${dt.year}-${dt.month}-${dt.day}`;
    }

    createDto() {
        const dto: any = {};

        /*DATETIME*/
        dto.MissionEnd = this.convertToIso(this.MissionEnd);
        dto.MissionStart = this.convertToIso(this.MissionStart);

        /*LOOKUP*/
        dto.RequestingUnitId = this.RequestingUnitId;

        /*PERSON OR GROUP*/
        if (this.SelectedRequesters.length === 1) {
            dto.RequesterId = this.SelectedRequesters[0].Id;
        } else {
            dto.RequesterId = null;
        }

        /*STRING*/
        dto.Conop = this.Conop;
        dto.OperationType = this.OperationType;

        return dto;
    }

    setProperties(json: any) {
        /*DATETIME*/
        this.MissionEnd = this.convertToBootstrapDate(json.MissionEnd);
        this.MissionStart = this.convertToBootstrapDate(json.MissionStart);

        /*LOOKUP*/
        this.RequestingUnitId = json.RequestingUnit.Id;

        /*STRING*/
        this.Conop = json.Conop;
        this.OperationType = json.OperationType;
    }
}
