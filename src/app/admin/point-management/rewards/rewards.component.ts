import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class RewardsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allReward;
  moment = moment;
  isEdit = false;
  reward = { startDate: moment().format("YYYY/MM/DD"), endDate: moment().format("YYYY/MM/DD") }
  subParams: Subscription;
  ranges;
  dateRange;
  isError = false;


  constructor(
    private loaderService: LoaderService,
    public sharedService: SharedService,
    private router: Router,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.ranges = [
      {
        text: 'Today',
        value: [moment().format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")],
        isSelected: true
      },
      {
        text: 'Yesterday',
        value: [moment().subtract(1, 'days').format("YYYY/MM/DD"), moment().subtract(1, 'days').format("YYYY/MM/DD")],
        isSelected: false
      },
      {
        text: 'Last 7 Days',
        value: [moment().subtract(6, 'days').format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")],
        isSelected: false
      },
      {
        text: 'Last 30 Days',
        value: [moment().subtract(29, 'days').format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")],
        isSelected: false
      },
      {
        text: 'This Month',
        value: [moment().startOf('month').format("YYYY/MM/DD"), moment().endOf('month').format("YYYY/MM/DD")],
        isSelected: false
      },
      {
        text: 'Last Month',
        value: [moment().subtract(1, 'month').startOf('month').format("YYYY/MM/DD"), moment().subtract(1, 'month').endOf('month').format("YYYY/MM/DD")],
        isSelected: false
      },
      {
        text: 'Last Three Month',
        value: [moment().subtract(1, 'month').startOf('month').format("YYYY/MM/DD"), moment().subtract(3, 'month').endOf('month').format("YYYY/MM/DD")],
        isSelected: false
      },
    ]

    // this.loaderService.presentLoading();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{ targets: 5, orderable: false }, { targets: 6, orderable: false }]
    };
    this.isEdit = false;
    this.subParams = this.activeRoute.params.subscribe(params => {
      if (this.reward.startDate && this.reward.endDate) {
        this.getAllReward(this.reward);
      }
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

  onDelete(reward) {
    this.rewardsService.deleteReward(reward.id).subscribe(res => {
      this.isEdit = true;
      this.getAllReward(this.reward);
    })
  }
  // async onDelete(reward) {
  //   let control = await this.alertController.create({
  //     buttons: [{
  //       text: 'OK',
  //       handler: () => {
  //         console.log(' id ', reward.id);
  //         this.deleteReward(reward.id);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: () => { }
  //     }],
  //     message: 'Are you sure you want to delete ' + reward.name + ' ?',
  //   });
  //   control.present();
  // }
  // deleteReward(id) {
  //   this.rewardsService.deleteReward(id).subscribe(async () => {
  //     let alert = await this.alertController.create({
  //       message: 'Reward deleted successfully',
  //       buttons: [{
  //         text: 'OK',
  //         handler: () => {

  //           setTimeout(() => {
  //             this.isEdit = true;
  //             this.getAllReward(this.reward);
  //             console.log("Delayed for 1 second.");
  //           }, 1000)
  //         }
  //       }]
  //     });
  //     alert.present();
  //   });
  // }


  public trackItem(index: number, item: any) {
    return item.id;
  }

  dateSearch() {
    if (this.dateRange) {
      this.isError = false;
      this.loaderService.presentLoading();
      this.reward.startDate = this.dateRange[0]
      this.reward.endDate = this.dateRange[1]
      this.isEdit = true;
      this.getAllReward(this.reward);
    } else {
      this.isError = true;
    }
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
