import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { AppHeaderComponent } from '../components';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgQrScannerModule
  ],
  declarations: [
    FolderPage,
    LandingComponent
  ],
  providers: []
})
export class FolderPageModule {}
