import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SutraService } from 'src/app/services/sutra.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sutra-wise',
  templateUrl: './sutra-wise.component.html',
  styleUrls: ['./sutra-wise.component.scss'],
})
export class SutraWiseComponent implements OnInit {

  sutraWise: FormGroup;

  constructor
    (
      private router: Router,
      private _location: Location,
      public sutraService: SutraService
    ) { }

  allSutraCategory = [];
  allSutra = [];
  fetchedSelectedSutra;
  fetchedGathaCount;
  submited = false;
  statusData = [];
  sutraData = [];
  isStatus = false;

  ngOnInit() {
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
      let status = this.sutraWise.controls['status'].value
      this.isStatus = status.id === 3 ? true : false
      let sutraId = this.sutraWise.controls['sutra'].value
      this.sutraService.getAllSutraWiseStudent({ sutraId: sutraId.id })
        .subscribe(res => {
          if (res['sutraData']) {
            this.sutraData = res['sutraData'];
          }
        })
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }

}
