import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SummaryService } from 'src/app/services/summary-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-sutra-details',
  templateUrl: './sutra-details.component.html',
  styleUrls: ['./sutra-details.component.scss']
})
export class SutraDetailsComponent implements OnInit {

  constructor(
    public summaryService: SummaryService,
    public loadingController: LoadingController
  ) { }
  @Input() studentId;
  @Input() selectedYear;
  sutraDetailSummary = [];
  ngOnInit() {
    this.getSutraSummary();
  }

  async getSutraSummary() {
    let loading = await this.loadingController.create({ message: 'Please wait...'});
    await loading.present();
    let data = { id: this.studentId, year: this.selectedYear }
    this.summaryService.getSutraSummary(data).subscribe(
      async (res: any) => {
        // console.log(' getSutraSummary ', res);
        this.sutraDetailSummary = res;
        this.sutraDetailSummary.forEach(i => {
          if (i.completed != 'true') {
            i['pendingDays'] = moment().diff(moment(i.sutraStartDate), 'days');
          }
        })
        await loading.dismiss();
      }
    )

  }
}
