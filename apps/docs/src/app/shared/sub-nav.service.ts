import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SubNavService {
  vcr: ViewContainerRef;
}
