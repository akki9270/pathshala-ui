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
      public sutraSerice: SutraService
    ) { }

  allSutraCategory = [];
  allSutra = [];
  fetchedSelectedSutra;
  fetchedGathaCount;
  submited = false;

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
  }
  get category() { return this.sutraWise.get('category'); }
  get sutra() { return this.sutraWise.get('sutra'); }
  get status() { return this.sutraWise.get('status'); }


  getAllCategory() {
    this.sutraSerice.getAllCategory()
      .subscribe(res => {
        if (res['data']) {
          this.allSutraCategory = res['data'];
        }
      })
  }

  getAllSutra(data) {
    this.sutraSerice.getAllSutra({ categoryId: data.id })
      .subscribe(res => {
        this.allSutra = res['data'];
      })
  }

  sutraSearch() {
    this.submited = true;
    if (this.sutraWise.valid) {
      console.log('SeARCh :: ', this.sutraWise.value);
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }

}
