import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BonusPointService } from './bonus-point.service';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../services/shared.service'
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-bonus-point',
  templateUrl: './bonus-point.component.html',
  styleUrls: ['./bonus-point.component.scss'],
})
export class BonusPointComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtElement: DataTableDirective;

  bonusPoint: FormGroup;
  allStudents = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  student: any = { id: '' };
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
      pageLength: 10,
      columnDefs: [{ targets: 3, orderable: false }]
    };
    this.fatchAllStudent(false);

    this.bonusPoint = new FormGroup({
      point: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      user_id: new FormControl(null),
      added_by: new FormControl(null),
      isPointAdded: new FormControl(null),
    });

  }
  fatchAllStudent(isEdit) {
    this.bonusPointService.bonusPoint()
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allStudents = res['data'];
        if (isEdit) {
          this.rerender();
        } else {
          this.dtTrigger.next();
        }
      })
  }
  savePoint() {
    this.submited = true;
    if (this.bonusPoint.valid) {
      this.bonusPointService.addPoint(this.bonusPoint.value)
        .subscribe(res => {
          this.fatchAllStudent(true);
        })
      this.close();
    }
  }

  public open(modal: any, student: any): void {
    this.modalService.open(modal);
    this.student = student;
    this.sharedService.getTeacher.subscribe((data: any) => {
      this.bonusPoint.controls['added_by'].patchValue(data.id)
    });
    this.bonusPoint.controls['user_id'].patchValue(this.student.id)
    this.bonusPoint.controls['isPointAdded'].patchValue(1)
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

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}
