import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-vehicle',
  templateUrl: './find-vehicle.component.html',
  styleUrls: ['./find-vehicle.component.scss']
})
export class FindVehicleComponent implements OnInit {

  filters = false;
    comparisonComponent = false;
    tempArray = [];
    carList = [
    {
        carID: 1,
        carBrand: 'BMW',
        carModel: 'F30',
        equipment: {
            airConditioning: true,
            manualGearbox: false,
            navigation: true,
            heatedSeats: true,
            sunroof: true
        },
        performance: {
            capacity: 2000,
            power: 200,
            acceleration: 5.8,
            vmax: 280,
            carYear: 2012
        },
        price: 200,
        compare: true,
        carImg: '\\assets\\cars-img\\bmw-f30.jpg'
    },
    {
        carID: 2,
        carBrand: 'Audi',
        carModel: 'A5',
        equipment: {
            airConditioning: true,
            manualGearbox: false,
            navigation: true,
            heatedSeats: true,
            sunroof: true
        },
        performance: {
            capacity: 2000,
            power: 200,
            acceleration: 5.8,
            vmax: 280,
            carYear: 2012
        },
        price: 200,
        compare: true,
        carImg: '\\assets\\cars-img\\audi-a5.jpg'
    },
    {
        carID: 3,
        carBrand: 'Audi',
        carModel: 'A5',
        equipment: {
            airConditioning: true,
            manualGearbox: false,
            navigation: true,
            heatedSeats: true,
            sunroof: true
        },
        performance: {
            capacity: 2000,
            power: 200,
            acceleration: 5.8,
            vmax: 280,
            carYear: 2012
        },
        price: 200,
        compare: false,
        carImg: '\\assets\\cars-img\\audi-a5-1.jpg'
    },
    {
        carID: 3,
        carBrand: 'Audi',
        carModel: 'A5',
        equipment: {
            airConditioning: false,
            manualGearbox: false,
            navigation: false,
            heatedSeats: true,
            sunroof: false
        },
        performance: {
            capacity: 2000,
            power: 200,
            acceleration: 5.8,
            vmax: 280,
            carYear: 2012
        },
        price: 200,
        compare: true,
        carImg: '\\assets\\cars-img\\audi-a5-1.jpg'
    }
    ];

    carName = [
    ];

    carModel = [
    ];

     years = [
     ];

    howManyComp = 0;


  constructor() {  }

  ngOnInit(): void {
      // this.carName = this.filter.returnObiect();
      // this.years = this.filter.returnYears();
    //   console.log(Object.keys(this.carList[0].equipment).length);
  }
  markBrand(info) {
    console.log(info);
    switch (info) {
        case 'bmw': {
            this.carModel = this.carName[0].list;
            break;
        }
        case 'audi': {
            this.carModel = this.carName[1].list;
            break;
        }
        case 'mercedes': {
            this.carModel = this.carName[2].list;
            break;
        }
        case 'lambo': {
            this.carModel = this.carName[3].list;
            break;
        }
        }
    }
    addToCompare(car) {
        const id = car.carID;
        const index = this.carList.findIndex( ind => ind.carID === id);
        this.carList[index].compare = !this.carList[index].compare;
    }

    comparison() {
        this.comparisonComponent = !this.comparisonComponent;
        this.tempArray = this.carList.filter( ind => ind.compare === true);
    }
}


