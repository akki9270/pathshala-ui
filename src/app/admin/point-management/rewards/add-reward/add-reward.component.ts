import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRewardService } from './add-reward.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss'],
})
export class AddRewardComponent implements OnInit {

  addReward: FormGroup;
  allReward = [];
  submitted: Boolean = false;
  rewardId;
  editBtn: Boolean;
  tommorow: Date = moment().toDate();
  minDate: String = formatDate(this.tommorow, 'yyyy-MM-dd', 'en');
  minEndDate: String = formatDate(this.tommorow, 'yyyy-MM-dd', 'en');
  minAnnounceDate: String = formatDate(this.tommorow, 'yyyy-MM-dd', 'en');

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private addRewardService: AddRewardService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activeRoute.paramMap.subscribe((params) => {
      this.rewardId = params.get("id");
    });
    if (this.rewardId) {
      this.editBtn = true;
      this.fetchReward(this.rewardId);
    } else {
      this.editBtn = false;
    }

    this.addReward = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      required_point: new FormControl(null, Validators.required),
      item_image_url: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      start_date: new FormControl(null, Validators.required),
      end_date: new FormControl(null, Validators.required),
      announcement_date: new FormControl(null, Validators.required),
    });

    this.addReward.get('start_date').valueChanges.subscribe(value => {
      this.minEndDate = formatDate(value, 'yyyy-MM-dd', 'en');
    })
    this.addReward.get('end_date').valueChanges.subscribe(value => {
      this.minAnnounceDate = formatDate(value, 'yyyy-MM-dd', 'en');
    })
  }

  saveReward() {
    this.submitted = true;
    if (this.addReward.valid) {
      if (this.rewardId) {
        this.addRewardService.updateReward(this.addReward.value)
          .subscribe(res => {
            this.allReward = res['data'];
            this.submitted = false;
            this.addReward.reset();
            this.router.navigateByUrl("/point/rewards");
          })
      } else {
        this.addRewardService.createReward(this.addReward.value)
          .subscribe(res => {
            this.allReward = res['data'];
            this.submitted = false;
            this.addReward.reset();
            this.router.navigateByUrl("/point/rewards");
          })
      }
    }
  }
  fetchReward(rewardId) {
    this.addRewardService.getReward(rewardId)
      .subscribe(res => {
        let reward = {
          id: res.data.id,
          name: res.data.name,
          required_point: res.data.required_point,
          description: res.data.description,
          item_image_url: res.data.item_image_url,
          start_date: formatDate(res.data.start_date, 'yyyy-MM-dd', 'en'),
          end_date: formatDate(res.data.end_date, 'yyyy-MM-dd', 'en'),
          announcement_date: formatDate(res.data.announcement_date, 'yyyy-MM-dd', 'en')
        }
        this.addReward.patchValue(reward)
      })
  }
}
