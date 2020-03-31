import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit {
  equipment = [
    {key: 'manual', value: 'Manual'},
    {key: 'heatedSeats', value: 'Heated Seats'},
    {key: 'ventilatedSeats', value: 'Ventilated seats'},
    {key: 'navigation', value: 'Navigation'},
    {key: 'airConditioning', value: 'Air Conditioning'},
    {key: 'multifunction', value: 'Multifunction'},
    {key: 'xenon', value: 'Xenon'},
    {key: 'bixenons', value: 'Bi-xenons'},
    {key: 'sunroof', value: 'Sunroof'},
  ];

  selectedEquipment = [];
  selectedFile: File = null;
  newCarForm: FormGroup;
  postComplete = true;
  postError = false;

  private tempEquipment = null;


  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newCarForm = new FormGroup({
      _id: new FormControl(1),
      brand: new FormControl(null),
      model: new FormControl(null),
      price: new FormControl(null),
      mileage: new FormControl(null),
      capacity: new FormControl(null),
      horsepower: new FormControl(null),
      acceleration: new FormControl(null),
      year: new FormControl(null),
      manual: new FormControl(false),
      multifunction: new FormControl(false),
      ventilatedSeats: new FormControl(false),
      heatedSeats: new FormControl(false),
      navigation: new FormControl(false),
      airConditioning: new FormControl(false),
      sunroof: new FormControl(false),
      bixenons: new FormControl(false),
      xenon: new FormControl(false),
      image: new FormControl(null)
    });
  }

  setEquipment() {
    if (!this.selectedEquipment.includes(this.tempEquipment) && this.selectedEquipment !== undefined) {
      this.selectedEquipment.push(this.tempEquipment);
      this.newCarForm.get(this.tempEquipment.key).setValue(true);
    }
  }

  deleteItem(item) {
    const index = this.selectedEquipment.indexOf(item);
    let tempAray = [];
    tempAray = this.selectedEquipment.slice(0, index).concat(this.selectedEquipment.slice(1 + index));
    this.selectedEquipment = tempAray;
    this.newCarForm.get(item.key).setValue(false);
  }

  selectOption(value) {
    console.log(value.value);
    this.tempEquipment = {key: value.value, value: value.text};
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  clearForm() {
    this.newCarForm.reset();
  }

  onUpload() {

    const uploadData = new FormData();
    uploadData.append('brand', this.newCarForm.get('brand').value);
    uploadData.append('model', this.newCarForm.get('model').value);
    uploadData.append('price', this.newCarForm.get('price').value);
    uploadData.append('mileage', this.newCarForm.get('mileage').value);
    uploadData.append('capacity', this.newCarForm.get('capacity').value);
    uploadData.append('horsepower', this.newCarForm.get('horsepower').value);
    uploadData.append('acceleration', this.newCarForm.get('acceleration').value);
    uploadData.append('year', this.newCarForm.get('year').value);
    uploadData.append('manual', this.newCarForm.get('manual').value);
    uploadData.append('multifunction', this.newCarForm.get('multifunction').value);
    uploadData.append('ventilatedSeats', this.newCarForm.get('ventilatedSeats').value);
    uploadData.append('heatedSeats', this.newCarForm.get('heatedSeats').value);
    uploadData.append('navigation', this.newCarForm.get('navigation').value);
    uploadData.append('airConditioning', this.newCarForm.get('airConditioning').value);
    uploadData.append('sunroof', this.newCarForm.get('sunroof').value);
    uploadData.append('bixenons', this.newCarForm.get('bixenons').value);
    uploadData.append('xenon', this.newCarForm.get('xenon').value);
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:3001/vehicles',
      uploadData
      ).subscribe(
        data => {},
      err => {},
      () => {
        this.postComplete = true;
        this.clearForm();
      }
    );
  }
}
