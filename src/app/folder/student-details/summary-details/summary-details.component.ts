import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SummaryService } from 'src/app/services/summary-service.service';

@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.scss']
})
export class SummaryDetailsComponent implements OnInit {

  constructor(
    public summaryService: SummaryService,
    public loadingController: LoadingController
  ) { }
  
  @Input() studentId;
  @Input() selectedYear;

  summaryDetails = [];

  ngOnInit() {
    this.getUserSutraSummary();
  }

  async getUserSutraSummary() {
    let loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    let data = { id: this.studentId, year: this.selectedYear }
    this.summaryService.getUserSutraSummary(data)
    .subscribe( async (res: any) => {
      // console.log(' getUserSutraSummary ', res);
      this.summaryDetails = res;
      await loading.dismiss();
    })
  }
}
