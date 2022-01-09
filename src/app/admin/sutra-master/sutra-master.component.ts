import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SutraService } from 'src/app/services/sutra.service';

@Component({
  selector: 'app-sutra-master',
  templateUrl: './sutra-master.component.html',
  styleUrls: ['./sutra-master.component.scss']
})
export class SutraMasterComponent implements OnInit {

  constructor(public _location: Location, 
    public sutraSerice: SutraService) { }

  allSutraCategory = [];
  categoryForm: FormGroup = new FormGroup({
    selectedSutraCategory: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    name_english: new FormControl('', [Validators.required]),
    gatha_count: new FormControl('', [Validators.required]),
    // queue_number: new FormControl('', []),
  });

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.sutraSerice.getAllCategory()
    .subscribe(res => {
      // console.log('res ', res);
      if (res['data']) {
        this.allSutraCategory = res['data'];
      }
    })
  }

  goBack() {
    this._location.back();
  }

  saveData() {
    console.log(this.categoryForm.value);
    const data = this.categoryForm.value;
    if(!this.categoryForm.valid) {
      return;
    }
    this.sutraSerice.saveCatSutra(data)
      .subscribe((res) => {
        console.log(' res ', res);
        this.closeForm();
      }, (error) => {
        console.log(' error ', error);
      })
  }

  closeForm() {
    this.categoryForm.reset();
    this.categoryForm.markAsPristine();
  }
}
