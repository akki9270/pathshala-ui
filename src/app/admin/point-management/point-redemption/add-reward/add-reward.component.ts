import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { AddRewardService } from './add-reward.service';

@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss'],
})
export class AddRewardComponent implements OnInit {

  addReward: FormGroup;
  allReward = [];

  constructor(
    private _location: Location,
    public sharedService: SharedService,
    private router: Router,
    private addRewardService: AddRewardService
  ) { }

  ngOnInit() {
    this.addReward = new FormGroup({
      name: new FormControl(null),
      required_point: new FormControl(null),
      item_image_url: new FormControl(null),
      description: new FormControl(null),
      start_date: new FormControl(null),
      end_date: new FormControl(null),
      announcement_date: new FormControl(null),
    });
    this.sharedService.getStudent.subscribe((data: any) => {
      this.addReward.controls['name'].patchValue(data.first_name)
    })
  }

  saveReward() {
    if (this.addReward.valid) {
      this.addRewardService.createReward(this.addReward.value)
        .subscribe(res => {
          this.allReward = res['data'];
          this.addReward.reset();
        })
      // console.log('rewards submitted :', this.addReward.value);
      this.router.navigateByUrl("/point/point-redepmtion");
    }
  }

  backClicked() {
    this._location.back();
  }

}
