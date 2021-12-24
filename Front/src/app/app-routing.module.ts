import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent} from "./owner/owner.component";
import {OwnerCreateComponent} from "./owner/owner-create/owner-create.component";

const routes: Routes = [
  { path: 'owners', component: OwnerComponent },
  { path: 'addOwner', component: OwnerCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
