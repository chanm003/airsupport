import { Injectable } from '@angular/core';

@Injectable()
export class EntityService {
  clone<T>(source: T): T {
    return Object.assign({}, source);
  }
}