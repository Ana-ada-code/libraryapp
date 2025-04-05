import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowUsersComponent} from "./show-users/show-users.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {ReadUserComponent} from "./read-user/read-user.component";
import {CreateBookComponent} from "./create-book/create-book.component";

const routes: Routes = [

  {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: 'users', component: ShowUsersComponent},
  {path: 'add-user', component: CreateUserComponent},
  {path: 'update', component: UpdateUserComponent},
  {path: 'details/:id', component: ReadUserComponent},
  // { path: 'books', component: ShowBooksComponent },
  {path: 'add-book', component: CreateBookComponent}
  // { path: 'update-book', component: UpdateBookComponent },
  // { path: 'details-book/:id', component: ReadBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
