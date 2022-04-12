import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Location } from '@angular/common';
import { BonusPointService } from '../bonus-point/bonus-point.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { AddRewardService } from './add-reward/add-reward.service';
import { data } from 'jquery';


@Component({
  selector: 'app-point-redemption',
  templateUrl: './point-redemption.component.html',
  styleUrls: ['./point-redemption.component.scss'],
})
export class PointRedemptionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allReward = [];
  addReward: any;

  constructor(
    private _location: Location,
    private bonusPointService: BonusPointService,
    private loaderService: LoaderService,
    public sharedService: SharedService,
    private router: Router,
    private addRewardService: AddRewardService
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    let reward = { startDate: '2021-08-24', endDate: '2021-09-27' }
    this.fatchAllReward(reward);
    //   this.addRewardService.getReward()
    //     .subscribe(res => {
    //       this.loaderService.dismisLoading();
    //       this.allReward = res['data'];
    //       console.log('list rewoerd::', this.allReward)
    //       this.dtTrigger.next();
    //     })
  }
  fatchAllReward(data) {
    this.addRewardService.getReward(data)
      .subscribe(res => {
        console.log('list reward :', res)
        this.loaderService.dismisLoading();
        this.allReward = res['data'];
        this.dtTrigger.next();
      })
  }

  onEditReward(index: any) {
    this.sharedService.setStudent(this.allReward[index]);
    this.router.navigateByUrl("/point/point-redepmtion/edit-reward/" + index);
    // this.router.navigate(['/point/point-redepmtion/edit-reward']);
  }

  onDeleteReward(index: any) {
    this.allReward.splice(index, 1);
  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
