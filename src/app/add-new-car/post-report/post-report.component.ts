import {Component, Input, OnInit} from '@angular/core';
import {PostReportServiceService} from '../../services/post-report-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.scss']
})
export class PostReportComponent implements OnInit {
  @Input() errorOccured = true;
  @Input() message;
  constructor(private reportService: PostReportServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  closeComponent() {
    this.reportService.pushValue(false);
    this.router.navigate(['/']);
  }

}
