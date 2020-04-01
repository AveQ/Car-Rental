import {Component, Input, OnInit} from '@angular/core';
import {PostReportServiceService} from './post-report-service.service';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.scss']
})
export class PostReportComponent implements OnInit {
  @Input() errorOccured = true;
  @Input() message;
  constructor(private reportService: PostReportServiceService) { }

  ngOnInit(): void {
  }
  closeComponent() {
    this.reportService.pushValue(false);
  }

}
