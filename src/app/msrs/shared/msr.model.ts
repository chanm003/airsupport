import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';

export class Msr {
    Conop?: string;
    MissionEnd?: NgbDateStruct;
    MissionStart?: NgbDateStruct;
    OperationType?: string;
    RequestingUnit?: any;
    RequestingUnitId?: number;
    constructor(json?:any) {
        if(json){
            this.setProperties(json);
            console.log(json);
        }
    }

    convertToBootstrapDate(iso:string): NgbDateStruct{
        var m = moment(iso);
        return {
            month: m.month()+1,
            day: m.date(),
            year: m.year()
        }
    }

    convertToIso(dt:NgbDateStruct){
        return `${dt.year}-${dt.month}-${dt.day}`;
    }

    createDto(){
        let dto:any = {};

        /*DATETIME*/
        dto.MissionEnd = this.convertToIso(this.MissionEnd);
        dto.MissionStart = this.convertToIso(this.MissionStart);

        /*LOOKUP*/
        dto.RequestingUnitId = this.RequestingUnitId;

        /*STRING*/
        dto.Conop = this.Conop;
        dto.OperationType = this.OperationType;

        return dto;
    }

    setProperties(json:any){
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
