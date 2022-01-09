import { Component, Input, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/services/summary-service.service';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.scss']
})
export class AttendanceDetailsComponent implements OnInit {

  constructor(
    public summaryService: SummaryService
  ) { }

  @Input() studentId;
  @Input() selectedYear;

  monthsArray = [
    { monthName: 'January', month: 1, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'February', month: 2, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'March', month: 3, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'April', month: 4, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'May', month: 5, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'June', month: 6, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'July', month: 7, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'August', month: 8, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'September', month: 9, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'Octomber', month: 10, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'November', month: 11, presentDays: 0, totalDays: 0, isDataAvailable: false },
    { monthName: 'December', month: 12, presentDays: 0, totalDays: 0, isDataAvailable: false },
  ];
  totalPresentDays = 0;
  totalWorkingDays = 0;
  ngOnInit() {
    this.getAttandanceSummary();  
  }

  getAttandanceSummary() {
    let data = {
      id: this.studentId,
      year: this.selectedYear
    }
    this.summaryService.getAttandanceSummary(data).subscribe(
      (res: any) => {
        // console.log(' getAttandanceSummary ', res);
        let data = res;
        data.forEach(i => {
          let found = this.monthsArray.findIndex(it => it.month == i.month);
          this.totalPresentDays += i['presentDays']; 
          this.totalWorkingDays += i['days'];
          if (found > -1) {
            this.monthsArray[found]['presentDays'] = i['presentDays'];
            this.monthsArray[found]['totalDays'] = i['days'];
            this.monthsArray[found]['isDataAvailable'] = true;
          }
        });
        // console.log(' this.monthsArray ', this.monthsArray);
      }
    )
  }
}
