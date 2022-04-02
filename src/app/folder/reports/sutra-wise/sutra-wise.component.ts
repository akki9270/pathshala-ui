import { Component, OnInit, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { SutraService } from 'src/app/services/sutra.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-sutra-wise',
  templateUrl: './sutra-wise.component.html',
  styleUrls: ['./sutra-wise.component.scss'],
})
export class SutraWiseComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtElement: DataTableDirective;

  sutraWise: FormGroup;

  constructor
    (
      private _location: Location,
      public sutraService: SutraService,
      private loaderService: LoaderService
    ) { }

  allSutraCategory = [];
  allSutra = [];
  fetchedSelectedSutra;
  fetchedGathaCount;
  submited = false;
  statusData = [];
  sutraData = [];
  isStatus = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getAllCategory();

    this.sutraWise = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      sutra: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required])
    });

    this.sutraWise.get('category').valueChanges.subscribe(value => {
      this.getAllSutra(value);
    })
    this.statusData = [
      {
        id: 1,
        name: 'In Progress'
      },
      {
        id: 2,
        name: 'Completed'
      },
      {
        id: 3,
        name: 'Both'
      },
    ]
  }

  getAllCategory() {
    this.sutraService.getAllCategory()
      .subscribe(res => {
        if (res['data']) {
          this.allSutraCategory = res['data'];
        }
      })
  }

  getAllSutra(data) {
    this.sutraService.getAllSutra({ categoryId: data.id })
      .subscribe(res => {
        this.allSutra = res['data'];
      })
  }

  onSutraSearch() {
    this.submited = true;
    if (this.sutraWise.valid) {
      this.loaderService.presentLoading();
      let status = this.sutraWise.controls['status'].value
      this.isStatus = status.id === 3 ? true : false
      let sutraId = this.sutraWise.controls['sutra'].value
      this.sutraService.getAllSutraWiseStudent({ sutraId: sutraId.id })
        .subscribe(res => {
          this.loaderService.dismisLoading();
          if (res['sutraData']) {
            this.sutraData = res['sutraData'];
            this.rerender();
          }
        })
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }
  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}
