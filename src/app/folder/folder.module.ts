import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { AppHeaderComponent } from '../components';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { LandingComponent } from './landing/landing.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AttendanceDetailsComponent } from './student-details/attendance-details/attendance-details.component';
import { SutraDetailsComponent } from './student-details/sutra-details/sutra-details.component';
import { SummaryDetailsComponent } from './student-details/summary-details/summary-details.component';
import { RewardDetailsComponent } from './student-details/reward-details/reward-details.component';
import { EventsComponent } from './events/events.component';
import { EventAttendanceComponent } from './events/event-attendance/event-attendance.component';
import { ReportsComponent } from './reports/reports.component';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FolderPageRoutingModule,
    NgQrScannerModule,
    IonicSelectableModule
  ],
  declarations: [
    FolderPage,
    LandingComponent,
    StudentDetailsComponent,
    AttendanceDetailsComponent,
    SutraDetailsComponent,
    SummaryDetailsComponent,
    EventsComponent,
    EventAttendanceComponent,
    ReportsComponent,
    RewardDetailsComponent
  ],
  providers: [],
})
export class FolderPageModule { }
