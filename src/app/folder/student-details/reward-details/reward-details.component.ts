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
        this.rewardId = this.studentObj.data[0].reward_id || null
      });
  }

  allReward() {
    this.rewardDetailsService.getAllReward(this.reward)
      .subscribe(res => {
        this.allRewards = res['data'];
      })
  }

  bookReward(id, point, name) {
    this.data.reward_id = id

    this.rewardDetailsService.bookReward(this.data)
      .subscribe(res => {
        this.removePoint(point, name)
        this.fetchBookedReward(this.studentId);
      })
  }

  removePoint(point, name) {
    let obj = {
      description: 'Book Reward: ' + name,
      isPointAdded: 0,
      point: point,
      user_id: this.data.user_id
    }
    this.rewardDetailsService.removePoint(obj)
      .subscribe(res => {
      })
  }
}
