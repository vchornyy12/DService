import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OwnerComponent} from "./owner/owner.component";
import {DeviceComponent} from "./device/device.component";

const routes: Routes = [
  { path: 'owners', component: OwnerComponent },
  { path: 'devices', component: DeviceComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
