import { Component, Input, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/services/summary-service.service';

@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.scss']
})
export class SummaryDetailsComponent implements OnInit {

  constructor(
    public summaryService: SummaryService
  ) { }
  
  @Input() studentId;
  @Input() selectedYear;

  summaryDetails = [];

  ngOnInit() {
    this.getUserSutraSummary();
  }

  getUserSutraSummary() {
    let data = { id: this.studentId, year: this.selectedYear }
    this.summaryService.getUserSutraSummary(data)
    .subscribe( (res: any) => {
      // console.log(' getUserSutraSummary ', res);
      this.summaryDetails = res;
    })
  }
}
