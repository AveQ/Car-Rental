import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FindVehicleService {
    isOpenCheckComponent: Subject<boolean> = new Subject<false>();
    private carBrand: string;
    private carList = [];
    carObserw$: Observable<object>;

    constructor(private http: HttpClient) {}

    pushValue(value: boolean) {
        this.isOpenCheckComponent.next(value);
    }
    setBrand(value: string) {
        this.carBrand = value;
    }
    getBrand() {
      return this.carBrand;
    }
    getAllVehicles() {
      return this.http.get('http://localhost:3001/vehicles');
    }
    patchVehicle(id, toChange, newValue) {
      return this.http.patch(('http://localhost:3001/vehicles/' + id), [{ "propName": toChange, "value": newValue}]);
    }

}
