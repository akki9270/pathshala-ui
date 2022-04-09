import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Location } from '@angular/common';
import { BonusPointService } from '../bonus-point/bonus-point.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-point-redemption',
  templateUrl: './point-redemption.component.html',
  styleUrls: ['./point-redemption.component.scss'],
})
export class PointRedemptionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allStudents = [];
  addReward: any;

  constructor(
    private _location: Location,
    private bonusPointService: BonusPointService,
    private loaderService: LoaderService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.bonusPointService.bonusPoint()
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allStudents = res['data'];
        this.dtTrigger.next();
      })
  }
  onEditReward(index: any) {
    this.sharedService.setStudent(this.allStudents[index]);
    this.router.navigateByUrl("/point/point-redepmtion/edit-reward/" + index);
    // this.router.navigate(['/point/point-redepmtion/edit-reward']);
  }

  onDeleteReward(index: any) {
    this.allStudents.splice(index, 1);
  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
