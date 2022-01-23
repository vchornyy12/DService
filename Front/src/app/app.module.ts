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
import {SortDirective} from './directive/sort.directive';
import {PageNotFoundComponent} from "../others/pageNotFound.component";

@NgModule({
    declarations: [
        AppComponent,
        DeviceComponent,
        OwnerComponent,
        SortDirective,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxPaginationModule
    ],
    providers: [OwnerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
