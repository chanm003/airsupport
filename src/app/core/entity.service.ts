import { Injectable } from '@angular/core';

@Injectable()
export class EntityService {
  clone<T>(ctr: {new(): T; }, source: T): T {
    return Object.assign(new ctr(), source);
  }
}