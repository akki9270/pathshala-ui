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

@NgModule({
    declarations: [
        AdminDashboardComponent,
        StudentMasterComponent,
        SutraMasterComponent
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
