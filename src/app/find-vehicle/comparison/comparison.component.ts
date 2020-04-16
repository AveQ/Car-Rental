import { Component, OnInit } from '@angular/core';
import {CarComparisonService} from '../../services/carComparison.service';

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

  constructor(
    private comparisonService: CarComparisonService
  ) { }

  ngOnInit(): void {
    this.arrayWithObjects = this.comparisonService.getCarArray();
  }

  asIsOrder(a, b) {
    return 1;
  }

  without(key) {
    if ( (key === '_id' || key === 'historyId' || key === 'image')){
      return 0;
    } else {
      return 1;
    }
  }
}
