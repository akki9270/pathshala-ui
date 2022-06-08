import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { BookedRewardsService } from './booked-rewards.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booked-rewards',
  templateUrl: './booked-rewards.component.html',
  styleUrls: ['./booked-rewards.component.scss'],
})
export class BookedRewardsComponent implements OnInit {

  studentSearch: FormGroup;
  bookRewards = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  rewardCount: any;
  isShowCount = false;

  constructor(
    private bookedRewardsService: BookedRewardsService,
    private _location: Location,
    public modalController: ModalController,
    private loaderService: LoaderService

  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.bookedRewardsService.getAllBookRewards()
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.bookRewards = res['data'];
        this.filterRewards();
        this.dtTrigger.next();
      })
  }

  filterRewards() {
    let rewards = {};
    this.bookRewards.forEach(i => {
      if (!rewards[i.Reward.name]) { rewards[i.Reward.name] = 1}
      else { rewards[i.Reward.name] += 1}
    });
    this.rewardCount = rewards;
  }

  onShowCountclick() {
    this.isShowCount = !this.isShowCount;
  }
  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
