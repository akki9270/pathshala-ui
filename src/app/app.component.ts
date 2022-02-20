import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SharedService } from './services/shared.service';
import { App as CapacitorApp } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  constructor(
    public platform: Platform,
    public sharedService: SharedService
  ) {
    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      if(!canGoBack){
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
    this.platform.pause.subscribe(() => {
      // localStorage.clear();
      // this.sharedService.setTeacher({});
    })
  }

  ngOnDestroy(): void {
      this.sharedService.setTeacher({});
  }
}
