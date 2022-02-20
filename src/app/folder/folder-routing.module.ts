import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventAttendanceComponent } from './events/event-attendance/event-attendance.component';
import { EventsComponent } from './events/events.component';

import { FolderPage } from './folder.page';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'Pathshala',
    component: FolderPage
  }, 
  {
    path: 'Events',
    component: EventsComponent
  },
  { 
    path: 'EventAttendance/:id', 
    component: EventAttendanceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
