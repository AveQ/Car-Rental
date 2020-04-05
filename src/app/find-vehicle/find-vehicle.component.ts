import {Component, OnInit, OnDestroy, ElementRef, Renderer2} from '@angular/core';
import {FindVehicleService} from '../services/find-vehicle.service';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SigninDynamicService} from '../services/signinDynamic.service';
import {take} from 'rxjs/operators';
import {CheckDateService} from './check-date/check-date-service.service';

@Component({
  selector: 'app-find-vehicle',
  templateUrl: './find-vehicle.component.html',
  styleUrls: ['./find-vehicle.component.scss']
})
export class FindVehicleComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private isAdministrator = false;
  page = 1;
  limit = 2;
  canBeNext = false;
  canBePrevious = false;
  isCheckDate = false;
  editCar = false;
  filters = false;
  editMode = false;
  adres = 'http://localhost:3001/';
  tempArray = [];
  carList = [];
  isSignIn = false;
  carToRent;

  order = [
    'brand',
    'model',
    'year',
    'price',
    'capacity',
    'horse Power'
  ];
  currentOrder = 'none';
  typeList = [
    'asc',
    'desc'
  ];
  currentType = 'asc';

  constructor(
    private checkDateService: CheckDateService,
    private render: Renderer2, private http: HttpClient,
    private findVehicleService: FindVehicleService,
    private signService: SigninDynamicService) {
  }

  ngOnInit(): void {
    this.initCheckComp();
    this.getAllVehicles();
    this.userSub = this.signService.user.pipe(take(1)).subscribe(user => {
      if (user && user.isAdmin === 'ADMIN') {
        this.isAdministrator = true;
      } else {
        this.isAdministrator = false;
      }
      this.isSignIn = !!user;
    });
  }

  initCheckComp() {
    this.checkDateService.checkComp.next(false);
    this.checkDateService.checkComp.subscribe(
      sub => {
        this.isCheckDate = sub;
      }
    );
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
    this.checkDateService.checkComp.next(true);
    this.checkDateService.setCar(object);
  }

  changeType(value) {
    this.currentType = value.value;
  }
  changeOrder(value) {
    this.currentOrder = value.value;
  }
  ngOnDestroy(): void {
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
  orderResult() {
    if (this.carList.length > 0) {
      this.findVehicleService.orderVehicles(this.carList, this.currentOrder, this.currentType);
    }
  }
  nextPage() {
    if ( this.canBeNext ) {
      this.page++;
      this.getAllVehicles();
    }
  }
  previousPage() {
    if ( this.canBePrevious ) {
      this.page--;
      this.getAllVehicles();
    }
  }
  getAllVehicles() {
    this.canBeNext = false;
    this.canBePrevious = false;
    this.findVehicleService.getAllVehicles(this.page, this.limit).subscribe(
      data => {
        const tempList = [];
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            if ( element === 'next') {
              this.canBeNext = true;
            } else if ( element === 'previous' ) {
              this.canBePrevious = true;
            } else { // take car objects and push them to carList
              for (const car in data[element]) {
                if (data.hasOwnProperty(element)) {
                  Object.keys(data[element][car]).forEach(key => {
                    if (key === 'image') {
                      const img = data[element][car];
                      img[key] = this.adres + img[key];
                    }
                  });
                  tempList.push(data[element][car]);
                }
              }
            }
          }
        }
        this.carList = tempList;
      },
      err => {
      },
      () => {
        this.orderResult();
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
  isUserAnAdmin() {
    return this.isAdministrator;
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



