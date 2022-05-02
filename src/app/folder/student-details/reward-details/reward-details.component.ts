import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SharedService } from 'src/app/services/shared.service';
import { RewardDetailsService } from './reward-details.service';

@Component({
  selector: 'app-reward-details',
  templateUrl: './reward-details.component.html',
  styleUrls: ['./reward-details.component.scss'],
})
export class RewardDetailsComponent implements OnInit {

  moment = moment;
  allRewards = [];
  reward = { startDate: '2021-09-28', endDate: '2022-12-30' }
  data = {
    user_id: null,
    reward_id: null
  }
  studentObj;
  rewardId;

  constructor(
    private rewardDetailsService: RewardDetailsService,
    public sharedService: SharedService
  ) { }
  @Input() studentId;
  @Input() studentPoint;

  ngOnInit() {
    this.allReward();
    this.data.user_id = this.studentId;
    this.fetchBookedReward(this.studentId);
  }

  fetchBookedReward(id) {
    this.rewardDetailsService.fetchBookedReward(id)
      .subscribe(res => {
        this.studentObj = res;
        this.rewardId = this.studentObj.data ? this.studentObj.data[0].reward_id : {}
      })
  }

  allReward() {
    this.rewardDetailsService.getAllReward(this.reward)
      .subscribe(res => {
        this.allRewards = res['data'];
      })
  }

  imageLoadError(event) {
    event.target.src = 'https://via.placeholder.com/300';
  }

  bookReward(id) {
    this.data.reward_id = id

    this.rewardDetailsService.bookReward(this.data)
      .subscribe(res => {
        this.fetchBookedReward(this.studentId);
      })
  }
}
