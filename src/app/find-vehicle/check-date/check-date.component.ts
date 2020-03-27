import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FindVehicleService } from '../find-vehicle.service';

@Component({
  selector: 'app-check-date',
  templateUrl: './check-date.component.html',
  styleUrls: ['./check-date.component.scss']
})
export class CheckDateComponent implements OnInit {

  today: Date = new Date();
  dateForm: FormGroup;
  date: string ;
  carBrand: string;
  response: boolean = false;
  available: boolean = false;

  constructor(private findVehicleService: FindVehicleService) { }

  ngOnInit(): void {
    this.carBrand = this.findVehicleService.getBrand();
    this.createDay();
    this.createForm();
  }
  createDay() {
    let month;
    if ((this.today.getMonth() + 1) < 10 ) {
      month = '0' + (this.today.getMonth() + 1);
    } else {
      month = this.today.getMonth() + 1 + '';
    }
    this.date = '' + this.today.getFullYear() + '-' + month + '-' +  this.today.getDate();
  }
  createForm() {
    this.dateForm = new FormGroup({
      trip_start: new FormControl(null, [Validators.required]),
      days: new FormControl(null, [Validators.required, Validators.max(14)]),
    });
  }

  onSubmit() {
    console.log(this.dateForm);
  }
  closeComponent() {
    this.findVehicleService.pushValue(false);
  }
}
