declare var google: any;
import { Component, OnInit, ViewChild, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})
export class LocalisationComponent implements OnInit, AfterViewInit {
  @ViewChild('gmap') gmapElement;

  map;
  constructor() { }
  ngAfterViewInit(): void {
    const mapProp = {
      center: new google.maps.LatLng(50.449343, 19.371257),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    const marker = [new google.maps.Marker({
      position: { lat: 50.449343, lng: 19.371257 },
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      title: 'Rent Car Pietras!'
    }), new google.maps.Marker({
      position: { lat: 50.511039, lng: 19.254089 },
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      title: 'Rent Car Pietras first company!'
    })];



    // marker.setMap(this.map);
  }


  ngOnInit() {
  }

}

// const mapProp = {
//   center: new google.maps.LatLng( 50.449343, 19.371257),
//   zoom: 15,
//   mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

//   let marker = new google.maps.Marker({
//     position: {lat: 50.449343, lng: 19.371257},
//     map: this.map,
//     animation: google.maps.Animation.BOUNCE,
//     title: 'Barber Pietro :)!'
//   });

//   marker.setMap(this.map);