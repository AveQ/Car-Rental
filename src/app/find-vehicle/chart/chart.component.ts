import {Component, OnDestroy, OnInit} from '@angular/core';
import {FindVehicleService} from '../../services/find-vehicle.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  title = 'Number of rentals';
  private inter;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels = ['Name'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public cars = [];
  public barChartData = [
    {
      data: [
        this.cars[0],
        this.cars[1],
        this.cars[2],
        this.cars[3],
        this.cars[4]
      ],
      label: this.title, backgroundColor: 'red'
    }
  ];
  public chartColors = [
    {
      borderColor: 'silver',
      pointBackgroundColor: 'rgb(26,132,177)',
      backgroundColor: 'rgb(214,37,18)',
      hoverBackgroundColor: 'rgba(214,37,18,0.59)',
    },
  ];

  // dynamic chart

  titleDynamic = 'Random value';
  public barChartOptionsDynamic = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabelsDynamic = ['1', '2', '3', '4', '5'];
  public barChartLegendDynamic = true;
  // public valueDynamic = [1, 2, 3, 4, 5];
  public barChartDataDynamic = [
    {
      data: [
        this.cars[0],
        this.cars[1],
        this.cars[2],
        this.cars[3],
        this.cars[4]
      ],
      label: this.titleDynamic, backgroundColor: 'red'
    }
  ];
  public chartColorsDynamic = [
    {
      borderColor: 'silver',
      pointBackgroundColor: 'rgb(26,132,177)',
      backgroundColor: [
        'rgb(214,37,18)',
        'rgb(0,6,26)',
        'rgb(27,0,214)',
        'rgb(0,87,88)',
        'rgb(5,0,37)'],
      hoverBackgroundColor: 'rgba(214,37,18,0.59)',
    },
  ];

  constructor(
    private vehicleService: FindVehicleService
  ) {
  }

  getChartDynamicValue() {
    let tempArr = [];
    this.vehicleService.getAllRandoms().subscribe(
      data => {
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            tempArr.push(data[element]);
            console.log(tempArr);
          }
        }
      },
      error => {
      },
      () => {
        this.barChartDataDynamic[0].data = [
          tempArr[0],
          tempArr[1],
          tempArr[2],
          tempArr[3],
          tempArr[4],
        ];
        console.log(tempArr);
      }
    );

  }

  ngOnInit(): void {
    this.getAllVehicle();
    this.getChartDynamicValue();
    this.inter = setInterval(() => {
      this.getChartDynamicValue();
    }, 3000);
  }


  getAllVehicle() {
    let tempArrayNumbers = [];
    let tempArray = [];
    let tempArrayName = [];
    this.vehicleService.getAllVehicleWithoutPag().subscribe(
      cars => {
        for (const element in cars) {
          if (cars.hasOwnProperty(element)) {
            tempArray.push(cars[element]);
            tempArrayNumbers.push(cars[element].historyId.split(' ').length);
          }
        }
      },
      error => {
      },
      () => {
        tempArrayNumbers = tempArrayNumbers.sort((a, b) => {
          return b - a;
        });
        tempArray = tempArray.sort((a, b) => {
          return b.historyId.split(' ').length - a.historyId.split(' ').length;
        });
        tempArrayName = tempArray.sort((a, b) => {
          return b.historyId.split(' ').length - a.historyId.split(' ').length;
        }).map((name) => {
          if (name) {
            return name.brand + ' ' + name.model;
          }
        });
        this.cars = tempArray;

        this.barChartData[0].data =
          [
            tempArrayNumbers[0],
            tempArrayNumbers[1],
            tempArrayNumbers[2],
            tempArrayNumbers[3],
            tempArrayNumbers[4],
          ];

        for (let i = 0; i < 5; i++) {
          if (tempArrayName[i]) {
            this.barChartLabels[i] = tempArrayName[i];
          }
        }
        this.cars = tempArrayName;
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.inter);
  }
}
