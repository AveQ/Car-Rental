import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostReportServiceService {
  isOpenReport: Subject<boolean> = new Subject<boolean>();
  constructor() {
  }
  pushValue(value: boolean) {
    this.isOpenReport.next(value);
  }

}
