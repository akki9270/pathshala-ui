import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BonusPointService } from './bonus-point.service';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../services/shared.service'

@Component({
  selector: 'app-bonus-point',
  templateUrl: './bonus-point.component.html',
  styleUrls: ['./bonus-point.component.scss'],
})
export class BonusPointComponent implements OnInit {

  bonusPoint: FormGroup;
  allStudents = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  student = { id: '' };
  submited = false;


  constructor(
    private _location: Location,
    private bonusPointService: BonusPointService,
    private loaderService: LoaderService,
    private modalService: NgbModal,
    public sharedService: SharedService
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

    this.bonusPoint = new FormGroup({
      point: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      studentId: new FormControl(null),
      teacherId: new FormControl(null),
    });

  }
  savePoint() {
    this.submited = true;
    if (this.bonusPoint.valid) {
      console.log('bonuspoint submitted :', this.bonusPoint.value);
      this.close();
    }
  }

  public open(modal: any, student: any): void {
    this.modalService.open(modal);
    this.student = student;
    this.sharedService.getTeacher.subscribe((data: any) => {
      this.bonusPoint.controls['teacherId'].patchValue(data.id)
    });
    this.bonusPoint.controls['studentId'].patchValue(this.student.id)
  }

  close() {
    this.modalService.dismissAll();
    this.bonusPoint.reset();
    this.submited = false;
  }
  backClicked() {
    this._location.back();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
