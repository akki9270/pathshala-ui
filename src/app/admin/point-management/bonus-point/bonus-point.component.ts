import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BonusPointService } from './bonus-point.service';
import { DateWiseService } from '../../../folder/reports/date-wise/date-wise.service';

@Component({
  selector: 'app-bonus-point',
  templateUrl: './bonus-point.component.html',
  styleUrls: ['./bonus-point.component.scss'],
})
export class BonusPointComponent implements OnInit {

  bonusSearch: FormGroup;
  submited = false;
  tableData = [];
  filteredData = [];
  stuentSearch;

  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private bonusPointService: BonusPointService,
    private dateWiseService: DateWiseService
  ) { }

  ngOnInit() {
    this.tableData = this.dateWiseService.fetchTableData();
    this.filteredData = this.tableData;
    this.bonusSearch = this.formBuilder.group({
      id: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      point: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')])
    });
  }

  onBonusSearch() {
    this.submited = true;
    if (this.bonusSearch.valid) {
      this.bonusPointService.bonusSearch(this.bonusSearch.value)
      this.submited = false;
    }
  }

  backClicked() {
    this._location.back();
  }

  filteredList(search) {
    this.filteredData = this.tableData.filter(stuedent => {
      return search ? stuedent.name.toLowerCase().includes(search.toLowerCase()) : this.tableData
    })
  }

}
