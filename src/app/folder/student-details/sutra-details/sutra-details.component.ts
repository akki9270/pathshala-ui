import { Component, Input, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/services/summary-service.service';

@Component({
  selector: 'app-sutra-details',
  templateUrl: './sutra-details.component.html',
  styleUrls: ['./sutra-details.component.scss']
})
export class SutraDetailsComponent implements OnInit {

  constructor(
    public summaryService: SummaryService
  ) { }
  @Input() studentId;
  @Input() selectedYear;
  sutraDetailSummary = [];
  ngOnInit() {
    this.getSutraSummary();
  }

  getSutraSummary() {
    let data = { id: this.studentId, year: this.selectedYear }
    this.summaryService.getSutraSummary(data).subscribe(
      (res: any) => {
        // console.log(' getSutraSummary ', res);
        this.sutraDetailSummary = res;
      }
    )

  }
}
