import {Component, OnInit, OnDestroy, ElementRef, Renderer2} from '@angular/core';
import {FindVehicleService} from '../services/find-vehicle.service';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SigninDynamicService} from '../services/signinDynamic.service';
import {take} from 'rxjs/operators';
import {CheckDateService} from './check-date/check-date-service.service';
import {CarComparisonService} from '../services/carComparison.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-find-vehicle',
  templateUrl: './find-vehicle.component.html',
  styleUrls: ['./find-vehicle.component.scss']
})
export class FindVehicleComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private isAdministrator = false;
  loadingData = true;
  page = 1;
  limit = 2;
  canBeNext = false;
  canBePrevious = false;
  isCheckDate = false;
  editCar = false;
  filters = false;
  editMode = false;
  adres = 'http://localhost:3001/';
  carList = [];
  isSignIn = false;
  carsToComparison = [];
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
  paramsSubscription: Subscription;

  constructor(
    private checkDateService: CheckDateService,
    private render: Renderer2,
    private http: HttpClient,
    private router: Router,
    private findVehicleService: FindVehicleService,
    private signService: SigninDynamicService,
    private comparisonService: CarComparisonService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.page = params['page'];
    //   }
    // );
    this.paramsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.page = params.page;
      }
    );
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
    this.comparisonService.addCar(car);
  }

  comparison() {
    if ( this.comparisonService.getCarArray().length > 0 ) {
      this.router.navigateByUrl('/comparison');
    }
    // this.tempArray = this.carList.filter(ind => ind.compare === true);
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
  isCarAddToComp(car) {
    const index = this.comparisonService.getCarArray().findIndex((car1) => car1._id === car._id);
    if ( index === -1 ) {
      return false;
    } else {
      return true;
    }
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
      this.router.navigate(['/vehicles'], {queryParams: {page: this.page}});
    }
  }
  previousPage() {
    if ( this.canBePrevious ) {
      this.page--;
      this.getAllVehicles();
      this.router.navigate(['/vehicles'], {queryParams: {page: this.page}});
    }
  }
  getAllVehicles() {
    this.loadingData = true;
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
        this.loadingData = false;
      }
    );
  }
  patchTextValue(id, newValue, elementName) {
    const text = newValue.value.replace(/\s/g, '');
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
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}



