import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { AddRewardService } from './add-reward/add-reward.service';
import * as moment from 'moment';
import { PointRedemptionService } from './point-redemption.service';


@Component({
  selector: 'app-point-redemption',
  templateUrl: './point-redemption.component.html',
  styleUrls: ['./point-redemption.component.scss'],
})
export class PointRedemptionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allReward = [];
  moment = moment;

  constructor(
    private _location: Location,
    private loaderService: LoaderService,
    public sharedService: SharedService,
    private router: Router,
    private addRewardService: AddRewardService,
    private pointRedemptionService: PointRedemptionService
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    // let reward = { startDate: '2021-08-24', endDate: '2021-09-27' }
    let reward = { startDate: '2022-04-12', endDate: '2022-04-12' }
    this.getAllReward(reward);

  }
  getAllReward(data) {
    this.pointRedemptionService.getReward(data)
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allReward = res['data'];
        console.log('fatch', this.allReward)
        this.dtTrigger.next();
      })
  }

  onEditReward(index: any) {
    this.sharedService.setStudent(this.allReward[index]);
    this.router.navigateByUrl("/point/point-redepmtion/edit-reward/" + index);

  }

  onDeleteReward(index: any) {
    this.allReward.splice(index, 1);
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

}
