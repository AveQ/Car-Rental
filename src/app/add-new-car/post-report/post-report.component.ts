import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.scss']
})
export class PostReportComponent implements OnInit {
  errorOccured = true;
  message = 'Unknown error';
  constructor() { }

  ngOnInit(): void {
  }

}
