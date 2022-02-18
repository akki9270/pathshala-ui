import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { LandingComponent } from './landing/landing.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './event-list/event-list.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
