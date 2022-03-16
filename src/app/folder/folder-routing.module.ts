import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventAttendanceComponent } from './events/event-attendance/event-attendance.component';
import { EventsComponent } from './events/events.component';

import { FolderPage } from './folder.page';
import { LandingComponent } from './landing/landing.component';
import { DateWiseComponent } from './reports/date-wise/date-wise.component';
import { MonthWiseComponent } from './reports/month-wise/month-wise.component';
import { ReportsComponent } from './reports/reports.component';
import { StudentWiseComponent } from './reports/student-wise/student-wise.component';
import { SutraWiseComponent } from './reports/sutra-wise/sutra-wise.component';
import { TeacherWiseComponent } from './reports/teacher-wise/teacher-wise.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'Pathshala',
    component: FolderPage,
  },
  {
    path: 'Events',
    component: EventsComponent,
  },
  {
    path: 'EventAttendance/:id',
    component: EventAttendanceComponent,
  },
  {
    path: 'reports',
    children: [
      {
        path: '',
        component: ReportsComponent,
      },
      {
        path: 'datewise',
        component: DateWiseComponent,
      },
      {
        path: 'monthwise',
        component: MonthWiseComponent,
      },
      {
        path: 'sutrawise',
        component: SutraWiseComponent,
      },
      {
        path: 'teacherwise',
        component: TeacherWiseComponent,
      },
      {
        path: 'studentwise',
        component: StudentWiseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
