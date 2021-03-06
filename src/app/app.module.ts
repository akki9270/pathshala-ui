import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppHeaderComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP } from '@ionic-native/http/ngx';
import { AdminModule } from './admin/admin.module';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    HTTP
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
