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
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        AdminRoutingModule
    ],
    exports: [],
    providers: [
        ImagePicker,
        File
    ],
})
export class AdminModule { }
