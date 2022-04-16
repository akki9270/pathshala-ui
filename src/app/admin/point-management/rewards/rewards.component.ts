import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

import { RewardsService } from './rewards.service';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';



@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
})
export class RewardsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allReward;
  moment = moment;
  isEdit = false;
  reward = { startDate: '2021-12-26', endDate: '2022-04-16' }
  subParams: Subscription;

  constructor(
    private loaderService: LoaderService,
    public sharedService: SharedService,
    private router: Router,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.isEdit = false;
    this.subParams = this.activeRoute.params.subscribe(params => {
      this.getAllReward(this.reward);
    });

  }
  getAllReward(data) {
    this.rewardsService.getReward(data)
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allReward = res.data;
        if (this.isEdit) {
          this.rerender();
        } else {
          this.dtTrigger.next();
        }
      })
  }

  onEditReward(index: any,) {
    this.isEdit = true;
    this.router.navigateByUrl("/point/rewards/edit-reward/" + index);
  }

  onDeleteReward(id: any) {
    this.rewardsService.deleteReward(id)
      .subscribe(res => {
        this.getAllReward(this.reward);
        this.isEdit = true;
      })
  }

  iconDisabled(date) {
    return moment(moment(date)).isBefore(moment());
  }

  goBack() {
    this.router.navigate(['/point'])
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
