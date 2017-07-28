import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment/moment';
import { NewsfeedItem, StatusChange } from './newsfeed.model';
import * as _ from 'lodash';

export class Msr {
    static fieldsLogic = {
        'AIE_related_fields': function (msr) {
            return msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Infill/Exfill' && msr.InfillExfillType === 'AIEs';
        },
        'EstimatedDimensionsWeight': function (msr) {
            return msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Equipment Drop';
        },
        'FFEquipment': function (msr) {
            return false;
        },
        'InfillExfillType': function (msr) {
            return msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Infill/Exfill';
        },
        'NumberOfPersonnel': function (msr) {
            return msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Infill/Exfill';
        },
        'NumberOfRefuelPointsRequired': function (msr) {
            return msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'FARP';
        },
        'ParachuteMFF': function (msr) {
            if (msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Infill/Exfill') {
                return msr.InfillExfillType === 'MFF';
            }

            return false;
        },
        'ParachuteStaticLine': function (msr) {
            if (msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Infill/Exfill') {
                return msr.InfillExfillType === 'Static Line';
            }

            return false;
        },
        'RAPIDS_related_fields': function (msr) {
            return msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Infill/Exfill' && 
                msr.InfillExfillType === 'RAPIDS';
        },
        'TypeRelease': function (msr) {
            if (msr.OperationType !== 'AIR Mobility (SAM)') { return false; }
            if (msr.AirMobilityType === 'Equipment Drop') { return true; }
            return false;
        }
    };

    static panelsLogic = {
        'DropZones': function (msr) {
            if (msr.OperationType === 'AIR Mobility (SAM)') {
                if (msr.AirMobilityType === 'Infill/Exfill') {
                    return _.includes(['MFF', 'Static Line'], msr.InfillExfillType);
                }
            }
            return false;
        },
        'LandingZones': function (msr) {
            if (msr.AirMobilityType === 'FARP') { return true; }
            if (msr.OperationType === 'AIR Mobility (SAM)') {
                if (msr.AirMobilityType === 'Infill/Exfill') {
                    return msr.InfillExfillType === 'RAPIDS' && msr.SurveysRequired;
                }
            }
            return false;
        },
        'ParachuteFields': function (msr) {
            if (msr.OperationType === 'AIR Mobility (SAM)' && msr.AirMobilityType === 'Infill/Exfill') {
                return msr.InfillExfillType === 'MFF' || msr.InfillExfillType === 'Static Line';
            }

            return false;
        },
        'Platforms': function (msr) {
            return msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)';
        },
        'PNForces': function (msr) {
            if (msr.OperationType === 'AIR Mobility (SAM)') {
                if (msr.AirMobilityType === 'HAAR/TAAR') { return true; }
                if (msr.AirMobilityType === 'Equipment Drop') { return true; }
                if (msr.AirMobilityType === 'FARP') { return true; }
                if (msr.AirMobilityType === 'Infill/Exfill') {
                    return _.includes(['MFF', 'Static Line'], msr.InfillExfillType);
                }
            }
            return false;
        },
        'TargetLocations': function (msr) {
            if (msr.OperationType === 'Special Tactics/Battlefield Airman (ST/BAO)') { return true; }
            if (msr.OperationType === 'AIR Mobility (SAM)') {
                if (msr.AirMobilityType === 'Infill/Exfill') {
                    return msr.InfillExfillType === 'AIEs';
                }
            }
            return false;
        },
        'Vehicles': function (msr) {
            if (msr.OperationType === 'AIR Mobility (SAM)') {
                if (msr.AirMobilityType === 'Infill/Exfill') {
                    return msr.InfillExfillType === 'RAPIDS' && msr.VehiclesRequired;
                }
            }
            return false;
        }
    };

    AircraftSecurityRequired?: boolean;
    AirfieldLocations?: string;
    AirMobilityType?: string;
    AltEmail?: string;
    AltPhone?: string;
    AltPOC?: string;
    AmplifyingDetail?: string;
    AssignedOutsideUnits?: Array<AssignedOutsideUnit>;
    AssignedSubunits?: Array<AssignedSubunit>;
    Author?: any;
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
    NewsfeedItems?: Array<any>;
    Notes?: string;
    NumberOfPallets?: number;
    NumberOfPAX?: number;
    NumberOfPersonnel?: number;
    NumberOfRefuelPointsRequired?: number;
    OperationType?: string;
    OtherAIE?: string;
    OwningUnitsId?: Array<number>;
    OwningUnits?: any;
    PalletWeight?: number;
    ParachuteMFF?: string;
    ParachuteStaticLine?: string;
    ParachuteTypeOther?: string;
    Pararescue?: string;
    PaxBaggageWeight?: number;
    Platforms?: Array<Platform>;
    PNForces?: Array<PNForce>;
    RappelRequired?: boolean;
    RelatedMissionId?: string;
    RequesterEmail?: string;
    RequesterPhone?: string;
    RequestingUnit?: any;
    RequestingUnitId?: number;
    SelectedMissions?: Array<any>;
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

    getMapFromDtoFunctions() {
        return {
            /*MAIN FORM*/
            'AirfieldLocations': (target, source, propName) => target[propName] = source[propName],
            'AltEmail': (target, source, propName) => target[propName] = source[propName],
            'AltPhone': (target, source, propName) => target[propName] = source[propName],
            'AltPOC': (target, source, propName) => target[propName] = source[propName],
            'CommunicationSupportReqs': (target, source, propName) => target[propName] = source[propName],
            'CommunicationSupportRequired': (target, source, propName) => target[propName] = source[propName],
            'Conop': (target, source, propName) => target[propName] = source[propName],
            'MedicalSupportReqs': (target, source, propName) => target[propName] = source[propName],
            'MedicalSupportRequired': (target, source, propName) => target[propName] = source[propName],
            'MissionEnd': (target, source, propName) => {
                target[propName] = this.convertToBootstrapDate(source[propName]);
            },
            'MissionStart': (target, source, propName) => {
                target[propName] = this.convertToBootstrapDate(source[propName]);
            },
            'NegativeImpact': (target, source, propName) => target[propName] = source[propName],
            'OperationType': (target, source, propName) => target[propName] = source[propName],
            'Requester': (target, source, propName) => {
                target['SelectedRequesters'] = [];
                const requester = source['Requester'];
                if (requester && requester.Title) {
                    target['SelectedRequesters'].push({
                        Id: requester.Id,
                        Title: requester.Title,
                        value: requester.Id,
                        display: requester.Title
                    });
                }
            },
            'RequesterEmail': (target, source, propName) => target[propName] = source[propName],
            'RequesterPhone': (target, source, propName) => target[propName] = source[propName],
            'RequestingUnit': (target, source, propName) => {
                target['RequestingUnitId'] = source[propName].Id;
                target[propName] = source[propName];
            },
            'Status': (target, source, propName) => target[propName] = source[propName],
            'RelatedMissionId': (target, source, propName) => target[propName] = source[propName],
            'RelatedMission': (target, source, propName) => {
                target['SelectedMissions'] = [];
                if (source[propName]) {
                    target['SelectedMissions'].push(JSON.parse(source[propName]));
                }
            },
            /*AIR MOBILITY FORM FIELDS*/
            'AirMobilityType': (target, source, propName) => target[propName] = source[propName],
            'EstimatedDimensionsHeight': (target, source, propName) => target[propName] = source[propName],
            'EstimatedDimensionsLength': (target, source, propName) => target[propName] = source[propName],
            'EstimatedWeight': (target, source, propName) => target[propName] = source[propName],
            'FastRopeRequired': (target, source, propName) => target[propName] = source[propName],
            'FFEquipment': (target, source, propName) => target[propName] = source[propName],
            'HoistRequired': (target, source, propName) => target[propName] = source[propName],
            'InfillExfillType': (target, source, propName) => target[propName] = source[propName],
            'NumberOfPersonnel': (target, source, propName) => target[propName] = source[propName],
            'NumberOfRefuelPointsRequired': (target, source, propName) => target[propName] = source[propName],
            'OtherAIE': (target, source, propName) => target[propName] = source[propName],
            'ParachuteMFF': (target, source, propName) => target[propName] = source[propName],
            'ParachuteStaticLine': (target, source, propName) => target[propName] = source[propName],
            'ParachuteTypeOther': (target, source, propName) => target[propName] = source[propName],
            'RappelRequired': (target, source, propName) => target[propName] = source[propName],
            'SurveysRequired': (target, source, propName) => target[propName] = source[propName],
            'TypeRelease': (target, source, propName) => target[propName] = source[propName],
            'VehiclesRequired': (target, source, propName) => target[propName] = source[propName],
            /*CARGO FORM FIELDS*/
            'AmplifyingDetail': (target, source, propName) => target[propName] = source[propName],
            'HazmatRequired': (target, source, propName) => target[propName] = source[propName],
            'IsuType': (target, source, propName) => target[propName] = source[propName],
            'IsuWeight': (target, source, propName) => target[propName] = source[propName],
            'NumberOfPallets': (target, source, propName) => target[propName] = source[propName],
            'NumberOfPAX': (target, source, propName) => target[propName] = source[propName],
            'PalletWeight': (target, source, propName) => target[propName] = source[propName],
            'PaxBaggageWeight': (target, source, propName) => target[propName] = source[propName],
            /*SPECIAL TACTICS FORM FIELDS*/
            'JtacCasType': (target, source, propName) => target[propName] = source[propName],
            'JtacFireType': (target, source, propName) => target[propName] = source[propName],
            'Pararescue': (target, source, propName) => target[propName] = source[propName],
            'Surveys': (target, source, propName) => target[propName] = source[propName],
            /*PANELS - DYNAMIC ADD/REMOVE ITEMS*/
            'DropZones': (target, source, propName) => target[propName] = JSON.parse(source[propName] || '[]'),
            'LandingZones': (target, source, propName) => target[propName] = JSON.parse(source[propName] || '[]'),
            'Platforms': (target, source, propName) => target[propName] = JSON.parse(source[propName] || '[]'),
            'PNForces': (target, source, propName) => target[propName] = JSON.parse(source[propName]) || '[]',
            'TargetLocations': (target, source, propName) => target[propName] = JSON.parse(source[propName] || '[]'),
            'Vehicles': (target, source, propName) => target[propName] = JSON.parse(source[propName] || '[]'),
            /*JSOAC/JMOC FIELDS*/
            'Notes': (target, source, propName) => target[propName] = source[propName],
            'OwningUnits': (target, source, propName) => target[propName] = source[propName],
            'OwningUnitsId': (target, source, propName) => target[propName] = source[propName].results,
            'SupportUnit': (target, source, propName) => {
                target['SupportUnitId'] = source[propName].Id;
                target[propName] = source[propName];
            },
            /*SUPPORT UNIT FIELDS*/
            'AircraftSecurityRequired': (target, source, propName) => target[propName] = source[propName],
            'AssignedSubunits': (target, source, propName) => target[propName] = JSON.parse(source[propName] || '[]'),
            'AssignedOutsideUnits': (target, source, propName) => target[propName] = JSON.parse(source[propName] || '[]'),
            'MissionSupportEnd': (target, source, propName) => {
                target[propName] = this.convertToBootstrapDate(source[propName]);
            },
            'MissionSupportStart': (target, source, propName) => {
                target[propName] = this.convertToBootstrapDate(source[propName]);
            },
            'StagingLocation': (target, source, propName) => target[propName] = source[propName],
            'SupportLocation': (target, source, propName) => target[propName] = source[propName],
            /*SP2013*/
            '__metadata': (target, source, propName) => target[propName] = source[propName],
            'AuthorId': (target, source, propName) => target[propName] = source[propName],
            'Attachments': (target, source, propName) => target[propName] = source[propName],
            'Created': (target, source, propName) => target[propName] = source[propName],
            'EditorId': (target, source, propName) => target[propName] = source[propName],
            'Id': (target, source, propName) => target[propName] = source[propName],
            'ID': (target, source, propName) => target[propName] = source[propName],
            'Modified': (target, source, propName) => target[propName] = source[propName],
            'Title': (target, source, propName) => target[propName] = source[propName],
            /*SP2013 READONLY EXPANDO*/
            'Author': (target, source, propName) => target[propName] = source[propName],
            'Editor': (target, source, propName) => target[propName] = source[propName],
        };
    }

    getMapToDtoFunctions() {
        return {
            /*MAIN FORM*/
            'AirfieldLocations': (target, source, propName) => target[propName] = source[propName],
            'AltEmail': (target, source, propName) => target[propName] = source[propName],
            'AltPhone': (target, source, propName) => target[propName] = source[propName],
            'AltPOC': (target, source, propName) => target[propName] = source[propName],
            'CommunicationSupportReqs': (target, source, propName) => target[propName] = source[propName],
            'CommunicationSupportRequired': (target, source, propName) => target[propName] = source[propName],
            'Conop': (target, source, propName) => target[propName] = source[propName],
            'MedicalSupportReqs': (target, source, propName) => target[propName] = source[propName],
            'MedicalSupportRequired': (target, source, propName) => target[propName] = source[propName],
            'MissionEnd': (target, source, propName) => {
                target[propName] = this.convertToIso(source[propName]);
            },
            'MissionStart': (target, source, propName) => {
                target[propName] = this.convertToIso(source[propName]);
            },
            'NegativeImpact': (target, source, propName) => target[propName] = source[propName],
            'OperationType': (target, source, propName) => target[propName] = source[propName],
            'SelectedRequesters': (target, source, propName) => {
                target['RequesterId'] = null;
                const selected = source['SelectedRequesters'];
                if (selected && selected.length) {
                    target['RequesterId'] = selected[0].Id;
                }
            },
            'RequesterEmail': (target, source, propName) => target[propName] = source[propName],
            'RequesterPhone': (target, source, propName) => target[propName] = source[propName],
            'RequestingUnitId': (target, source, propName) => target[propName] = source[propName],
            'Status': (target, source, propName) => target[propName] = source[propName],
            'RelatedMissionId': (target, source, propName) => target[propName] = source[propName],
            'SelectedMissions': (target, source, propName) => target['RelatedMission'] = (source[propName].length) ?
                JSON.stringify(source[propName][0]) : null,
            /*AIR MOBILITY FORM FIELDS*/
            'AirMobilityType': (target, source, propName) => target[propName] = source[propName],
            'EstimatedDimensionsHeight': (target, source, propName) => target[propName] = source[propName],
            'EstimatedDimensionsLength': (target, source, propName) => target[propName] = source[propName],
            'EstimatedWeight': (target, source, propName) => target[propName] = source[propName],
            'FastRopeRequired': (target, source, propName) => target[propName] = source[propName],
            'FFEquipment': (target, source, propName) => target[propName] = source[propName],
            'HoistRequired': (target, source, propName) => target[propName] = source[propName],
            'InfillExfillType': (target, source, propName) => target[propName] = source[propName],
            'NumberOfPersonnel': (target, source, propName) => target[propName] = source[propName],
            'NumberOfRefuelPointsRequired': (target, source, propName) => target[propName] = source[propName],
            'OtherAIE': (target, source, propName) => target[propName] = source[propName],
            'ParachuteMFF': (target, source, propName) => target[propName] = source[propName],
            'ParachuteStaticLine': (target, source, propName) => target[propName] = source[propName],
            'ParachuteTypeOther': (target, source, propName) => target[propName] = source[propName],
            'RappelRequired': (target, source, propName) => target[propName] = source[propName],
            'SurveysRequired': (target, source, propName) => target[propName] = source[propName],
            'TypeRelease': (target, source, propName) => target[propName] = source[propName],
            'VehiclesRequired': (target, source, propName) => target[propName] = source[propName],
            /*CARGO FORM FIELDS*/
            'AmplifyingDetail': (target, source, propName) => target[propName] = source[propName],
            'HazmatRequired': (target, source, propName) => target[propName] = source[propName],
            'IsuType': (target, source, propName) => target[propName] = source[propName],
            'IsuWeight': (target, source, propName) => target[propName] = source[propName],
            'NumberOfPallets': (target, source, propName) => target[propName] = source[propName],
            'NumberOfPAX': (target, source, propName) => target[propName] = source[propName],
            'PalletWeight': (target, source, propName) => target[propName] = source[propName],
            'PaxBaggageWeight': (target, source, propName) => target[propName] = source[propName],
            /*SPECIAL TACTICS FORM FIELDS*/
            'JtacCasType': (target, source, propName) => target[propName] = source[propName],
            'JtacFireType': (target, source, propName) => target[propName] = source[propName],
            'Pararescue': (target, source, propName) => target[propName] = source[propName],
            'Surveys': (target, source, propName) => target[propName] = source[propName],
            /*PANELS - DYNAMIC ADD/REMOVE ITEMS*/
            'DropZones': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            'LandingZones': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            'Platforms': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            'PNForces': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            'TargetLocations': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            'Vehicles': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            /*JSOAC/JMOC FIELDS*/
            'Notes': (target, source, propName) => target[propName] = source[propName],
            /*SUPPORT UNIT FIELDS*/
            'AircraftSecurityRequired': (target, source, propName) => target[propName] = source[propName],
            'AssignedSubunits': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            'AssignedOutsideUnits': (target, source, propName) => target[propName] = JSON.stringify(source[propName]),
            'MissionSupportEnd': (target, source, propName) => {
                target[propName] = this.convertToIso(source[propName]);
            },
            'MissionSupportStart': (target, source, propName) => {
                target[propName] = this.convertToIso(source[propName]);
            },
            'StagingLocation': (target, source, propName) => target[propName] = source[propName],
            'SupportLocation': (target, source, propName) => target[propName] = source[propName],
        };
    }

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
            this.SelectedMissions = [];
            this.SelectedRequesters = [];
            this.TargetLocations = [];
            this.Vehicles = [];
        }
    }

    private convertToBootstrapDate(iso: string): NgbDateStruct | null {
        const m = moment(iso);
        if (!m.isValid()) { return null; };

        return {
            month: m.month() + 1,
            day: m.date(),
            year: m.year()
        };
    }

    private convertToIso(dt: NgbDateStruct | null) {
        if (dt) {
            return `${dt.year}-${dt.month}-${dt.day}`;
        } else {
            return null;
        }
    }

    createDto(permissions) {
        const dto: any = {};
        _.each(this, (val, propName) => {
            const mapFunc = this.getMapToDtoFunctions()[propName];

            if (mapFunc) {
                mapFunc(dto, this, propName);
            } else {
                console.log(`${propName} has not been mapped`);
            }
        });
        return dto;
    }

    private setProperties(json: any) {
        _.each(json, (val, propName) => {
            const mapFunc = this.getMapFromDtoFunctions()[propName];

            if (mapFunc) {
                mapFunc(this, json, propName);
            } else {
                console.log(`${propName} field has not been mapped:`, val);
            }
        });

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

export class MsrTrackedChanges {

    private static hasStatusChanged(prev, current): StatusChange | null {
        const hasAssignedUnitChanged = current.SupportUnitId !== undefined && (current.SupportUnitId !== prev.SupportUnitId);
        const hasStatusChanged = current.Status !== prev.Status;
        const hasOwningUnitsChanged = current.OwningUnitsId !== undefined &&
            !this.arraysAreEqual(current.OwningUnitsId, prev.OwningUnitsId);

        if (!hasOwningUnitsChanged && !hasAssignedUnitChanged && !hasStatusChanged) {
            return null;
        }

        const associatedMission = current.SelectedMissions[0];
        const notification = new StatusChange();
        notification.Type = 'StatusChange';
        notification.JSON = {
            prevStatus: prev.Status,
            newStatus: current.Status,
            missionId: associatedMission.Id,
            missionTitle: associatedMission.Title
        };

        if (current.Status === 'Submitted') {
            /*No unit has taken ownership yet*/
            if (current.OwningUnitsId.length === 0) {
                notification.JSON.emailTemplate = 'Submitted';
            }
        }

        if (current.Status === 'Rejected') {
            notification.JSON.emailTemplate = 'Rejected';
        }

        if (current.Status === 'Approved') {
            notification.JSON.emailTemplate = 'Approved';
        }

        if (current.Status === 'Vetting') {
            notification.JSON.owningUnits = <Array<string>>_.map(current.OwningUnits, 'Name');
            notification.JSON.emailTemplate = 'Vetting';
        }

        if (current.Status === 'Planning') {
            notification.JSON.emailTemplate = 'Planning';
        }

        if (current.Status === 'Assigned') {
            notification.JSON.assignedUnit = current.SupportUnit.Name;
            notification.JSON.emailTemplate = 'AssignedToSupportUnit';
        }
        return notification;
    }

    static compare(prev, current): MsrChangeReport {
        return {
            StatusChange: MsrTrackedChanges.hasStatusChanged(prev, current)
        };
    }

    private static arraysAreEqual(arr1: Array<number>, arr2: Array<number>) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        return _.intersection(arr1, arr2).length === arr1.length;
    }
}

export class MsrChangeReport {
    StatusChange: StatusChange | null;
}
