import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FindVehicleService {

    constructor(private http: HttpClient) {}

    getAllVehicles(page, limit) {
      return this.http.get('http://localhost:3001/vehicles?page=' + page + '&limit=' + limit);
    }
    getAllVehicleWithoutPag() {
      return this.http.get('http://localhost:3001/vehicles/all');
    }
    getOneVehicle(id) {
      return this.http.get('http://localhost:3001/vehicles/' + id);
    }
    patchVehicle(id, toChange, newValue) {
      return this.http.patch(('http://localhost:3001/vehicles/' + id), [{ "propName": toChange, "value": newValue}]);
    }

  orderVehicles(data, order, type) {
    order = order.replace(' ', '').toLowerCase();
    const test = data.sort((a, b) => {
      if (type === 'asc') {
        return ((a[order] > b[order]) ? 1 : (a[order] < b[order]) ? -1 : 0);
      } else {
        return ((a[order] < b[order] ? 1 : (a[order] > b[order]) ? -1 : 0));
      }
    });
  }
}
