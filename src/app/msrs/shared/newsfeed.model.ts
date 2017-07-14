import * as moment from 'moment/moment';
import pnp, { Queryable, Item, ODataEntityArray } from 'sp-pnp-js';

export interface NewsfeedItem {
    RelatedMsrId?: number;
    Type: string;
    JSON: any;
    Author?: { Title: string };
    Created?: string;
}

export class StatusChange implements NewsfeedItem {
    RelatedMsrId?: number;
    Type: string;
    JSON: {
        prevStatus: string;
        newStatus: string;
        missionId: any,
        missionTitle: any,
        comments?: string;
        emailTemplate?: string;
        owningUnits?: Array<string>;
        assignedUnit?: string;
    };
    Author?: { Title: string };
    Created?: string;
}
