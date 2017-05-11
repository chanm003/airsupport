import * as moment from 'moment/moment';

export interface NewsfeedItem {
    RelatedMsrId: number;
    Type: string;
    JSON: any;
}

export class StatusChange implements NewsfeedItem {
    RelatedMsrId: number;
    Type: string;
    JSON: {
        prevStatus: string;
        newStatus: string;
        comments?: string;
    };
}
