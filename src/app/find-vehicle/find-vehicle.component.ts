import {Component, OnInit, OnDestroy, ElementRef, Renderer2} from '@angular/core';
import {FindVehicleService} from './find-vehicle.service';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-find-vehicle',
  templateUrl: './find-vehicle.component.html',
  styleUrls: ['./find-vehicle.component.scss']
})
export class FindVehicleComponent implements OnInit, OnDestroy {

  checkDate = false;
  editCar = false;
  filters = false;
  editMode = false;
  adres = 'http://localhost:3001/';
  tempArray = [];
  carList = [];
  carName = [];

  carModel = [];

  years = [];

  mySubscribe: Subscription;
  editingCar;

  constructor(private render: Renderer2, private http: HttpClient, private findVehicleService: FindVehicleService) {
  }

  ngOnInit(): void {
    this.mySubscribe = this.findVehicleService.isOpenCheckComponent.subscribe(data => {
      this.checkDate = data;
    });
    this.getAllVehicles();


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

  openCarInformation(value: HTMLElement) {
    if (value.classList.value === 'row info-container info-container--open') {
      value.classList.remove('info-container--open');
    } else {
      value.classList.add('info-container--open');
    }
  }

  editThisCar() {
    this.editMode = !this.editMode;
  }

  changeCarValues(car, value, name) {
    // car[name] = value+'';
    console.log(car[name]);
  }

  test(car) {
    this.editingCar = car;
    console.log(this.editingCar);
  }

  test2(car, value, name) {
    console.log(car[name]);
  }

  getAllVehicles() {
    this.findVehicleService.getAllVehicles().subscribe(
      data => {
        let tempList = [];
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            Object.keys(data[element]).forEach(key => {
              if (key === 'image') {
                const img = data[element];
                img[key] = this.adres + img[key];
              }
            });
            tempList.push(data[element]);
          }
        }
        this.carList = tempList;
      },
      err => {
      },
      () => {
      }
    );
  }

  patchTextValue(id, newValue, elementName) {
    const text = newValue.value.replace(/\s/g, "");
    if (text.length >= 2) {
      this.findVehicleService.patchVehicle(id, elementName, text).subscribe(
        data => {
        },
        err => {
        },
        () => {
          for (const element of this.carList) {
            if (element._id === id) {
              element[elementName] = text;
            }
          }
        }
      );
    }
  }

  patchVehicle(id, toChange, newValue) {

    this.findVehicleService.patchVehicle(id, toChange, newValue).subscribe(
      data => {
      },
      err => {
      },
      () => {
        for (const element of this.carList) {
          if (element._id === id) {
            element[toChange] = newValue;
          }
        }
      }
    );
  }

  deleteVehicle(id) {
    this.http.delete(('http://localhost:3001/vehicles/' + id)).subscribe(data => {
      },
      err => {
      },
      () => {
        this.getAllVehicles();
      }
    );
  }
}



