import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentMasterComponent } from './student-master/student-master.component';
import { SutraMasterComponent } from './sutra-master/sutra-master.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './event-list/event-list.component';
import { PointManagementComponent } from './point-management/point-management.component';
import { BonusPointComponent } from './point-management/bonus-point/bonus-point.component';
import { RewardsComponent } from './point-management/rewards/rewards.component';
import { PointLedgerComponent } from './point-management/point-ledger/point-ledger.component';
import { AddRewardComponent } from './point-management/rewards/add-reward/add-reward.component';
import { BookedRewardsComponent } from './point-management/booked-rewards/booked-rewards.component';
import { PointRedemptionComponent } from './point-management/point-redemption/point-redemption.component';

const routes: Route[] = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
  },
  {
    path: 'studentMaster',
    component: StudentMasterComponent
  },
  {
    path: 'sutraMaster',
    component: SutraMasterComponent
  },
  {
    path: 'point',
    children: [
      {
        path: '',
        component: PointManagementComponent,
      },
      {
        path: 'bonus-point',
        component: BonusPointComponent,
      },
      {
        path: 'rewards',
        children: [
          {
            path: '',
            component: RewardsComponent,
          },
          {
            path: 'add-reward',
            component: AddRewardComponent,
          },
          {
            path: 'edit-reward/:id',
            component: AddRewardComponent,
          }
        ],
      },
      {
        path: 'booked-reward',
        component: BookedRewardsComponent,
      },
      {
        path: 'point-redemption',
        component: PointRedemptionComponent,
      },
      {
        path: 'point-ledger',
        component: PointLedgerComponent,
      },
    ],
  },


  {
    path: 'Event/Edit/:id',
    component: EventsComponent
  },
  {
    path: 'Event/Add',
    component: EventsComponent
  },
  {
    path: 'EventList',
    component: EventListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
