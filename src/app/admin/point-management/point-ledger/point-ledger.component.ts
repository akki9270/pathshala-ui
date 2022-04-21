import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { PointLedgerService } from './point-ledger.service';

@Component({
  selector: 'app-point-ledger',
  templateUrl: './point-ledger.component.html',
  styleUrls: ['./point-ledger.component.scss'],
})
export class PointLedgerComponent implements OnInit {

  allStudents = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  studentSearch: FormGroup;

  constructor(
    private pointLedgerService: PointLedgerService,
    private loaderService: LoaderService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    // this.idSearch()
    this.pointLedgerService.studentSearch()
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allStudents = res['data'];
        this.dtTrigger.next();
      })

    this.studentSearch = new FormGroup({
      id: new FormControl(null)
    });
  }

  idSearch() {
    // let date = this.studentSearch.get('id').value
    // this.pointLedgerService.studentSearch({ date })
    //   .subscribe(res => {
    //     this.loaderService.dismisLoading();
    //     this.allStudents = res['data'];
    //     this.dtTrigger.next();
    //   })
  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
