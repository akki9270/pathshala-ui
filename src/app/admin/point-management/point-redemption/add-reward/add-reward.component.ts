import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss'],
})
export class AddRewardComponent implements OnInit {

  addReward: FormGroup;

  constructor(
    private _location: Location,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addReward = new FormGroup({
      name: new FormControl(null),
      rewardpoint: new FormControl(null),
      url: new FormControl(null),
      description: new FormControl(null),
      startdate: new FormControl(null),
      anddate: new FormControl(null),
      announcementdate: new FormControl(null),
    });
    this.sharedService.getStudent.subscribe((data: any) => {
      this.addReward.controls['name'].patchValue(data.first_name)
    })
  }
  saveReward() {
    if (this.addReward.valid) {
      console.log('rewards submitted :', this.addReward.value);
      this.router.navigateByUrl("/point/point-redepmtion");
    }
  }

  backClicked() {
    this._location.back();
  }

}
