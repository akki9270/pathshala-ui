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
  data = {
    user_id: null,
    reward_id: null
  }
  studentObj;
  rewardId;
  allbookRewards = [];
  usePoint;
  cancleBtn: Boolean;

  constructor(
    private rewardDetailsService: RewardDetailsService,
    public sharedService: SharedService
  ) { }
  @Input() studentId;
  @Input() studentPoint;

  ngOnInit() {
    this.allReward();
    this.data.user_id = this.studentId;
    this.getBookReward(this.studentId);
  }

  allReward() {
    this.rewardDetailsService.getAllReward()
      .subscribe(res => {
        this.allRewards = res['data'];
      })
  }
  getBookReward(id) {
    this.rewardDetailsService.fetchBookedReward(id)
      .subscribe(res => {
        this.allbookRewards = res['data'];
        this.usePoint = this.allbookRewards.map(item => item.Reward.required_point).reduce((prev, curr) => prev + curr, 0);

        this.rewardId = this.allbookRewards.map(item => item.reward_id);
      })
  }

  isBookedReward(id) {
    if (this.rewardId) {
      let flag = this.rewardId.find(bookId => bookId === id);
      return flag ? true : false
    } else {
      return false;
    }
  }

  imageLoadError(event) {
    event.target.src = 'https://via.placeholder.com/300';
  }

  bookReward(id) {
    this.data.reward_id = id

    this.rewardDetailsService.bookReward(this.data)
      .subscribe(res => {
        this.getBookReward(this.studentId);
        this.cancleBtn = true;
      })
  }

  cancleReward(reward_id) {
    let data = {
      reward_id: reward_id,
      user_id: this.studentId
    }
    this.rewardDetailsService.cancleReward(data)
      .subscribe(res => {
        this.getBookReward(this.studentId);
      })
  }
}
