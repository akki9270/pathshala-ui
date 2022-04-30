import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PointLedgerService } from './point-ledger.service';
import * as moment from 'moment';

@Component({
  selector: 'app-point-ledger',
  templateUrl: './point-ledger.component.html',
  styleUrls: ['./point-ledger.component.scss'],
})
export class PointLedgerComponent implements OnInit {

  allPoint = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  studentSearch: FormGroup;
  submitted = false;
  moment = moment;
  ranges;
  dateRange

  constructor(
    private pointLedgerService: PointLedgerService,
    private loaderService: LoaderService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.ranges = [
      {
        text: 'Today',
        value: [moment().format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")]
      },
      {
        text: 'Yesterday',
        value: [moment().subtract(1, 'days').format("YYYY/MM/DD"), moment().subtract(1, 'days').format("YYYY/MM/DD")]
      },
      {
        text: 'Last 7 Days',
        value: [moment().subtract(6, 'days').format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")]
      },
      {
        text: 'Last 30 Days',
        value: [moment().subtract(29, 'days').format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")]
      },
      {
        text: 'This Month',
        value: [moment().startOf('month').format("YYYY/MM/DD"), moment().endOf('month').format("YYYY/MM/DD")]
      },
      {
        text: 'Last Month',
        value: [moment().subtract(1, 'month').startOf('month').format("YYYY/MM/DD"), moment().subtract(1, 'month').endOf('month').format("YYYY/MM/DD")]
      },
      {
        text: 'Last Three Month',
        value: [moment().subtract(1, 'month').startOf('month').format("YYYY/MM/DD"), moment().subtract(3, 'month').endOf('month').format("YYYY/MM/DD")]
      },
    ]

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.pointLedgerService.studentPoint()
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allPoint = res['data'];
        this.dtTrigger.next();
      })

    this.studentSearch = new FormGroup({
      id: new FormControl(null, Validators.required),
      dateRange: new FormControl(null, Validators.required)
    });
  }

  dateSearch() {
    this.submitted = true;
    if (this.studentSearch.valid) {
      console.log('search ::', this.studentSearch.value)
      this.submitted = false;
    }

  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
