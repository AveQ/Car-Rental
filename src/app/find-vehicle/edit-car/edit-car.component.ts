import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {

  carValues = [
    'brand',
    'model',
    'price',
    'mileage',
    'capacity',
    'horsepower',
    'acceleration',
    'year',
    'manual',
    'multifunction',
    'ventilatedSeats',
    'heatedSeats',
    'navigation',
    'airConditioning',
    'sunroof',
    'bixenons',
    'xenon',
    'image'
  ];
  selectedEquipment = [];
  tempValue: string;
  edit = true;
  newCar = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(value) {
    this.tempValue = value;
    console.log(this.tempValue);
  }

  addToEdit() {
    console.log(this.tempValue);
    if (!this.selectedEquipment.includes(this.tempValue) && this.tempValue !== undefined) {
      this.selectedEquipment.push(this.tempValue);
    }
  }
  deleteItem(item) {
    const index = this.selectedEquipment.indexOf(item);
    let tempAray = [];
    tempAray = this.selectedEquipment.slice(0, index).concat(this.selectedEquipment.slice(1 + index));
    this.selectedEquipment = tempAray;
  }
  createObject(newCar) {
  return 9;
  }
}
