import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CheckDateService} from './check-date-service.service';

@Component({
  selector: 'app-check-date',
  templateUrl: './check-date.component.html',
  styleUrls: ['./check-date.component.scss']
})
export class CheckDateComponent implements OnInit {
  carToRent;
  carBrand: string;
  today: Date = new Date();
  dateForm: FormGroup;
  date: string ;
  response: boolean = false;
  available: boolean = false;

  constructor( private dateService: CheckDateService) { }

  ngOnInit(): void {
    this.createDay();
    this.createForm();
    this.carToRent = this.dateService.getCar();
    this.carBrand = this.carToRent.brand;

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
  closeComponent() {
    this.dateService.checkComp.next(false);
  }
  onSubmit() {
    console.log(this.dateForm);
    this.dateService.createRentalDate(this.dateForm.value);
  }
}
