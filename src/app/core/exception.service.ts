import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExceptionService {
  constructor() { }

  onBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = <Response>errorResponse;
    const err = res.text();
    const sp2013Exception = JSON.parse(err.substr(err.indexOf('{')));
    return Observable.throw(sp2013Exception.error.message.value);
  };
}