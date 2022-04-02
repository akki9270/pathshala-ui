import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: HTMLIonLoadingElement;
  isDataLoadding = true;

  constructor(public loadingController: LoadingController) { }

  async presentLoading() {
    if (this.loading) {
      return;
    }
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  dismisLoading() {
    of([]).pipe(delay(1000)).subscribe(() => {
      this.loading.dismiss();
      this.loading = null;
    })
  }


}
