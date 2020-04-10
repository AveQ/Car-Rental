import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {SigninDynamicService} from '../../services/signinDynamic.service';
import {FindVehicleService} from '../../services/find-vehicle.service';

@Injectable({providedIn: 'root'})
export class CheckDateService {
  checkComp = new Subject<boolean>();
  private startDay;
  private endDay;
  private bannedDays = [];
  private carToRent;
  private idUser;
  private userEmail;
  private accessToReq = false;
  private vehHistory: string = '';
  private userHistory: string = '';
  private historyId;
  userSub: Subscription;

  constructor(private http: HttpClient, private authService: SigninDynamicService, private findVehService: FindVehicleService) {
    this.userSub = authService.user.subscribe(
      user => {
        if (user) {
          this.idUser = user.id;
          this.userEmail = user.email;
        }
        this.accessToReq = !!user;
      });
  }
  createRentalDate(form) {
    const startD = form.trip_start;
    const numberOfDays = form.days;
    this.endDay = new Date((new Date(startD).getTime() + (numberOfDays * 86400000)));
    this.startDay = new Date(startD);
    console.log(new Date(this.endDay));
    this.checkDays();
  }

  checkDays() {
    this.http.get('http://localhost:3001/history').subscribe(
      data => {
        if (this.accessToReq) {
          let startReser;
          let endReser;
          for (const element in data) {
            if (data.hasOwnProperty(element)) {
              console.log("test" + this.carToRent._id);
              // if (data[element].vehicleId !== this.carToRent._id)
                startReser = new Date(data[element].from);
                endReser = new Date(data[element].to);
                if (!this.dateCompare(startReser.getTime(), endReser.getTime()) && data[element].vehicleId === this.carToRent._id) {
                  return null;
                }

            }
          }
          this.setReservation();
        }
      },
      error => {},
      () => {
      }
    );
  }

  dateCompare(start, end) {
    if ((end < this.endDay.getTime() && end < this.startDay.getTime()) ||
      (this.startDay.getTime() < start && this.endDay.getTime() < start)) {
      return true;
    } else {
      return false;
    }
    return false;
  }
  setCar(car) {
    this.carToRent = car;
  }
  getCar() {
    return this.carToRent;
  }
  setReservation() {
    this.http.post('http://localhost:3001/history', {userId: this.idUser, userEmail: this.userEmail, vehicleId: this.carToRent._id,
        vehicleName: this.carToRent.brand, from: this.startDay , to: this.endDay})
        .subscribe(
          data => {
              for (const element in data) {
                if (data.hasOwnProperty(element)) {
                  if (element === 'history') {
                    this.historyId = data[element]._id;
                  }
                }
              }
          },
          error => {},
          () => {
            this.getCurrentHistory();
          }
        );
  }
  getCurrentHistory() {
    this.findVehService.getOneVehicle(this.carToRent._id).subscribe(
      data => {
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            if (element === 'historyId') {
              if ( data[element] === '' ){
                this.vehHistory = data[element] + this.historyId;
              } else {
                this.vehHistory = data[element] + ' ' + this.historyId;
              }
              console.log(data[element]);
            }
          }
        }
      },
      error => {
      },
      () => {
        console.log("id: " + this.carToRent._id +" dane: "+ this.vehHistory);
        this.patchVehVal();
        this.patchUserVal();
      }
    );
  }
  patchVehVal() {
    this.findVehService.patchVehicle(this.carToRent._id, 'historyId', this.vehHistory).subscribe();
  }
  patchUserVal() {
    this.http.get('http://localhost:3001/user/' + this.idUser).subscribe(
      data => {
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            if (element === 'historyId') {
              if ( data[element] === '' ) {
                this.userHistory = data[element] + this.historyId;
              } else {
                this.userHistory = data[element] + ' ' + this.historyId;
              }
            }
          }
        }
      },
      error => {

      },
      () => {
        console.log(this.userHistory);
        this.http.patch(('http://localhost:3001/user/' + this.idUser), [{'propName': 'historyId', 'value': this.userHistory}]).subscribe();
      }
    );


  }
}


/*

console.log(startDay);
    console.log(endDay);

    if (startDay > endDay) {
      console.log('mlodszy');
    } else if (endDay > startDay) {
      console.log('starsza');
    } else {
      console.log('=');
    }
 */
