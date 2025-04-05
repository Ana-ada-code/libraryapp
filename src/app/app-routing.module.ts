import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowUsersComponent} from "./show-users/show-users.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {ReadUserComponent} from "./read-user/read-user.component";

const routes: Routes = [

  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'users', component: ShowUsersComponent },
  { path: 'add', component: CreateUserComponent },
  { path: 'update', component: UpdateUserComponent },
  { path: 'details/:id', component: ReadUserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
