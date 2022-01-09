import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DeviceComponent} from './device/device.component';
import {OwnerComponent} from './owner/owner.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {OwnerService} from "./owner/owner.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    OwnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
