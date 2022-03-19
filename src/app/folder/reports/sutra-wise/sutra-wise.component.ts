import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SutraService } from 'src/app/services/sutra.service';
import { FormControl, FormGroup } from '@angular/forms';


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

  ngOnInit() {
    this.getAllCategory();

    this.sutraWise = new FormGroup({
      category: new FormControl(''),
      sutra: new FormControl(''),
      status: new FormControl('')
    });

    this.sutraWise.get('category').valueChanges.subscribe(value => {
      this.getAllSutra(value);
    })
  }


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

  onSearch() {
    if (this.sutraWise.valid) {
      console.log('SeARCh :: ', this.sutraWise.value)
    }
  }

  backClicked() {
    this._location.back();
  }

}
