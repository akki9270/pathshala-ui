import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public sharedService: SharedService
  ) {
    this.platform.pause.subscribe(() => {
      // localStorage.clear();
      this.sharedService.setTeacher({});
    })
  }
}
