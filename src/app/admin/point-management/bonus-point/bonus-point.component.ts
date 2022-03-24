import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BonusPointService } from './bonus-point.service';

@Component({
  selector: 'app-bonus-point',
  templateUrl: './bonus-point.component.html',
  styleUrls: ['./bonus-point.component.scss'],
})
export class BonusPointComponent implements OnInit {

  bonussearch: FormGroup;

  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private bonusPointService: BonusPointService
  ) { }

  ngOnInit() {
    this.bonussearch = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      point: new FormControl('')
    });
  }

  bonusSearch() {
    this.bonusPointService.bonusSearch(this.bonussearch.value)
  }

  backClicked() {
    this._location.back();
  }

}
