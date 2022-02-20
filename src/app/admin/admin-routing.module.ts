import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentMasterComponent } from './student-master/student-master.component';
import { SutraMasterComponent } from './sutra-master/sutra-master.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './event-list/event-list.component';

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
