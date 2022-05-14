import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StudentMasterComponent } from './student-master/student-master.component';
import { SutraMasterComponent } from './sutra-master/sutra-master.component';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './event-list/event-list.component';
import { SutraWiseComponent } from '../folder/reports/sutra-wise/sutra-wise.component';
import { MonthWiseComponent } from '../folder/reports/month-wise/month-wise.component';
import { StudentWiseComponent } from '../folder/reports/student-wise/student-wise.component';
import { TeacherWiseComponent } from '../folder/reports/teacher-wise/teacher-wise.component';
import { BonusPointComponent } from './point-management/bonus-point/bonus-point.component';
import { DataTablesModule } from "angular-datatables";
import { DateWiseComponent } from '../folder/reports/date-wise/date-wise.component';
import { RewardsComponent } from './point-management/rewards/rewards.component';
import { AddRewardComponent } from './point-management/rewards/add-reward/add-reward.component';
import { PointManagementComponent } from './point-management/point-management.component';
import { BookedRewardsComponent } from './point-management/booked-rewards/booked-rewards.component';
import { PointLedgerComponent } from './point-management/point-ledger/point-ledger.component';
import { PointRedemptionComponent } from './point-management/point-redemption/point-redemption.component';

@NgModule({
    declarations: [
        AdminDashboardComponent,
        StudentMasterComponent,
        SutraMasterComponent,
        EventsComponent,
        EventListComponent,
        SutraWiseComponent,
        MonthWiseComponent,
        StudentWiseComponent,
        TeacherWiseComponent,
        BonusPointComponent,
        DateWiseComponent,
        RewardsComponent,
        AddRewardComponent,
        PointManagementComponent,
        BookedRewardsComponent,
        PointLedgerComponent,
        PointRedemptionComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        AdminRoutingModule,
        DataTablesModule
    ],
    exports: [],
    providers: [
        ImagePicker,
        File
    ],
})
export class AdminModule { }
