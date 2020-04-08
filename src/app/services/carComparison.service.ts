import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarComparisonService {
  carsToRental = [];
  constructor() {
  }
  addCar(car) {
     const index = this.carsToRental.findIndex((car1) => car1._id === car._id);
     if ( index === -1 ) {
        this.carsToRental.push(car);
     } else {
      this.carsToRental = this.carsToRental.slice(0, index).concat(this.carsToRental.slice(index + 1));
    }
  }
  getCarArray() {
    return this.carsToRental;
  }
  checkRedundancy(car) {
    for (const element in this.carsToRental) {
      if (this.carsToRental.hasOwnProperty(element)) {
        if (this.carsToRental[element]._id === car._id) {
          return false;
        }
      }
    }
    return true;
  }
}
