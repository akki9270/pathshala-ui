import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Location } from '@angular/common';
import { BonusPointService } from '../bonus-point/bonus-point.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-point-redemption',
  templateUrl: './point-redemption.component.html',
  styleUrls: ['./point-redemption.component.scss'],
})
export class PointRedemptionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allStudents = [];

  constructor(
    private _location: Location,
    private bonusPointService: BonusPointService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.bonusPointService.bonusSearch()
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allStudents = res['data'];
        this.dtTrigger.next();
      })
  }
  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
