import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

  arrayWithObjects = [
    {x: 2, e: 2, f: 2},
    {r: 3}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
