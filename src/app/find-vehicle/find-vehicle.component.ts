import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { FindVehicleService } from './find-vehicle.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-find-vehicle',
    templateUrl: './find-vehicle.component.html',
    styleUrls: ['./find-vehicle.component.scss']
})
export class FindVehicleComponent implements OnInit, OnDestroy {

    testuje: any;
    checkDate = false;
    filters = false;
    tempArray = [];
    carList = [
        {
            id: 1,
            brand: 'BMW',
            model: 'F30',
            price: 300,
            mileage: 13000,
            capacity: 3000,
            horsepower: 300,
            acceleration: 3,
            year: 2019,
            manual: false,
            multifunction: true,
            ventilatedSeats: false,
            heatedSeats: true,
            navigation: false,
            airConditioning: true,
            sunroof: true,
            bixenons: false,
            xenon: true,
            image: '\\assets\\cars-img\\bmw-f30.jpg',
            compare: true
        },
        {
            id: 2,
            brand: 'Audi',
            model: 'A5',
            price: 300,
            mileage: 13000,
            capacity: 3000,
            horsepower: 300,
            acceleration: 3,
            year: 2019,
            manual: false,
            multifunction: true,
            ventilatedSeats: false,
            heatedSeats: true,
            navigation: false,
            airConditioning: true,
            sunroof: true,
            bixenons: false,
            xenon: true,
            image: '\\assets\\cars-img\\audi-a5.jpg',
            compare: true
        },
        {
            id: 3,
            brand: 'Audi',
            model: 'A5',
            price: 300,
            mileage: 13000,
            capacity: 3000,
            horsepower: 300,
            acceleration: 3,
            year: 2019,
            manual: true,
            multifunction: true,
            ventilatedSeats: false,
            heatedSeats: true,
            navigation: false,
            airConditioning: true,
            sunroof: true,
            bixenons: false,
            xenon: true,
            image: '\\assets\\cars-img\\audi-a5-1.jpg',
            compare: true
        },
        {
            id: 4,
            brand: 'Audi',
            model: 'A5',
            price: 300,
            mileage: 13000,
            capacity: 3000,
            horsepower: 300,
            acceleration: 3,
            year: 2019,
            manual: true,
            multifunction: true,
            ventilatedSeats: false,
            heatedSeats: true,
            navigation: false,
            airConditioning: true,
            sunroof: true,
            bixenons: false,
            xenon: true,
            image: '\\assets\\cars-img\\audi-a5-1.jpg',
            compare: true
        }
    ];
    editCar = [];
    carName = [
    ];

    carModel = [
    ];

    years = [
    ];

    mySubscribe: Subscription;

    constructor(private render: Renderer2, private http: HttpClient,private findVehicleService: FindVehicleService) { }

    ngOnInit(): void {
        this.mySubscribe = this.findVehicleService.isOpenCheckComponent.subscribe(data => {
            this.checkDate = data;
        });
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
        const newId = car.id;
        const index = this.carList.findIndex(ind => ind.id === newId);
        this.carList[index].compare = !this.carList[index].compare;
    }

    comparison() {
        this.tempArray = this.carList.filter(ind => ind.compare === true);
    }
    openCheckComponent(object) {
        console.log(name);
        this.findVehicleService.pushValue(!this.checkDate);
        this.findVehicleService.setBrand(this.carList[object].brand);
    }
    ngOnDestroy(): void {
        this.mySubscribe.unsubscribe();
    }
    test() {
        this.http.get('http://localhost:3001/vehicles/5e7bae34c7c4c433fcb88594').subscribe(
            data => {
                console.log(data);
            }
        );
    }
    openCarInformation(value: HTMLElement, car) {
        if ( value.classList.value === 'row info-container info-container--open'){
            value.classList.remove('info-container--open');
        } else {
            value.classList.add('info-container--open');
        }
    }
}


