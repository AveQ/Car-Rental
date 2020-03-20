import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit {
  equipment = [
    'Heated Seats',
    'Ventilated seats',
    'Navigation',
    'Sunroof',
    'Multifunction',
    'Xenon',
    'Bi-xenons'
  ];
  selectedEquipment = [
  ];
  selectedFile: File = null;
  newCarForm: FormGroup;
  private tempEquipment = null;




  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    
  }

  onSubmit() {
    console.log(this.newCarForm.value);
  }
  createForm() {
    this.newCarForm = new FormGroup({
      brand: new FormControl(null),
      model: new FormControl(null),
      mileage: new FormControl(null),
      engineCapacity: new FormControl(null),
      horsePower: new FormControl(null),
      image: new FormControl(null),
      description: new FormControl(null),
      equipment:  new FormControl(this.selectedEquipment)
    });
  }
  addToSelectedEquipment() {
    if (!this.selectedEquipment.includes(this.tempEquipment)) {
      this.selectedEquipment.push(this.tempEquipment);
    }
  }
  deleteItem(item) {
    const index = this.selectedEquipment.indexOf(item);
    let tempAray = [];
    tempAray = this.selectedEquipment.slice(0, index).concat(this.selectedEquipment.slice(1 + index));
    this.selectedEquipment = tempAray;
    this.newCarForm.patchValue({equipment: this.selectedEquipment});
  }

  selectOption(value) {
    this.tempEquipment = value.text;
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  clearForm() {
    this.newCarForm.reset();
  }


  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(
      '', fd).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
