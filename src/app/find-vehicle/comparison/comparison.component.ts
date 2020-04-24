import { Component, OnInit } from '@angular/core';
import {CarComparisonService} from '../../services/carComparison.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  createPDF() {
    const date = new Date();
    const pdf = new jsPDF();
    const textWidth = pdf.getStringUnitWidth('Your Comparison') * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const textOffset = (pdf.internal.pageSize.width - textWidth) / 2;
    pdf.text(textOffset, 10, 'Your Comparison:');
    pdf.text(pdf.internal.pageSize.width /  pdf.internal.getFontSize() + 10, 10, date.getDate() +
      '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
    pdf.autoTable({
      html: '#myTable'
    });
    pdf.autoTable({
      html: '#mySecTable'
    });
    pdf.save('Comparison.pdf');
  }
}
