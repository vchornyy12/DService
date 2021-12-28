import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DeviceComponent} from './device/device.component';
import {OwnerComponent} from './owner/owner.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { OwnerCreateComponent } from './owner/owner-create/owner-create.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    OwnerComponent,
    OwnerCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
