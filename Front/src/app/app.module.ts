import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DeviceComponent} from './device/device.component';
import {OwnerComponent} from './owner/owner.component';
import {HttpClientModule} from "@angular/common/http";
import {OwnerService} from "./owner/owner.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {PageNotFoundComponent} from "./others/pageNotFound.component";
import { OwnerdetailComponent } from './ownerdetail/ownerdetail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { AppMaterialModule } from "./app.material-module";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
    declarations: [
        AppComponent,
        DeviceComponent,
        OwnerComponent,
        PageNotFoundComponent,
        OwnerdetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        MatTableModule,
        AppMaterialModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule
    ],
    providers: [OwnerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
