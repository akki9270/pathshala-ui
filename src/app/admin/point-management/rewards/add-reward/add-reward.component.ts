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

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private addRewardService: AddRewardService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params) => {
      this.rewardId = params.get("id");
    });

    this.addReward = new FormGroup({
      name: new FormControl(null, Validators.required),
      required_point: new FormControl(null, Validators.required),
      item_image_url: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      start_date: new FormControl(null, Validators.required),
      end_date: new FormControl(null, Validators.required),
      announcement_date: new FormControl(null, Validators.required),
    });
    this.sharedService.getStudent.subscribe((data: any) => {
      this.addReward.controls['name'].patchValue(data.name)
      this.addReward.controls['required_point'].patchValue(data.required_point)
      this.addReward.controls['item_image_url'].patchValue(data.item_image_url)
      this.addReward.controls['description'].patchValue(data.description)
      this.addReward.controls['start_date'].patchValue(data.start_date)
      this.addReward.controls['end_date'].patchValue(data.end_date)
      this.addReward.controls['announcement_date'].patchValue(data.announcement_date)
    })
  }

  saveReward() {
    this.submitted = true;
    if (this.addReward.valid) {
      this.addRewardService.createReward(this.addReward.value)
        .subscribe(res => {
          this.allReward = res['data'];
          this.submitted = false;
          this.addReward.reset();
        })

      this.router.navigateByUrl("/point/rewards");
    }
  }
}
