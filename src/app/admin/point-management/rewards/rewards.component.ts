import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

import { RewardsService } from './rewards.service';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
})
export class RewardsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allReward;
  moment = moment;
  isEdit = false;
  reward = { startDate: '2022-04-10', endDate: '2022-04-30' }
  subParams: Subscription;

  constructor(
    private loaderService: LoaderService,
    public sharedService: SharedService,
    private router: Router,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ targets: 5, orderable: false }, { targets: 6, orderable: false }]
    };

    this.isEdit = false;
    this.subParams = this.activeRoute.params.subscribe(params => {
      this.getAllReward(this.reward);
    });

  }
  getAllReward(data) {
    this.rewardsService.getReward(data)
      .subscribe(res => {
        this.loaderService.dismisLoading();
        this.allReward = res.data;
        if (this.isEdit) {
          this.rerender();
        } else {
          this.dtTrigger.next();
        }
        this.isEdit = true;
      })
  }

  onEditReward(index: any,) {
    this.router.navigateByUrl("/point/rewards/edit-reward/" + index);
  }

  async onDelete(reward) {
    let control = await this.alertController.create({
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log(' id ', reward.id);
          this.deleteReward(reward.id);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      }],
      message: 'Are you sure you want to delete ' + reward.name + ' ?',
    });
    control.present();
  }
  deleteReward(id) {
    this.rewardsService.deleteReward(id).subscribe(async () => {
      let alert = await this.alertController.create({
        message: 'Reward deleted successfully',
        buttons: ['OK']
      });
      alert.present();
      this.isEdit = true;
      this.getAllReward(this.reward);
    });
  }

  iconDisabled(date) {
    return moment(moment(date)).isBefore(moment());
  }

  goBack() {
    this.router.navigate(['/point'])
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
