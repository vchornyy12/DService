import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OwnerComponent} from "./owner/owner.component";
import {DeviceComponent} from "./device/device.component";
import {PageNotFoundComponent} from "./others/pageNotFound.component";
import {OwnerdetailComponent} from "./ownerdetail/ownerdetail.component";

const routes: Routes = [
    {path: 'owners', component: OwnerComponent},
    {path: 'devices', component: DeviceComponent},
    {path: 'owners/:id', component: OwnerdetailComponent},
    {path: '', redirectTo: '/owners', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
