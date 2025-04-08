import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowUsersComponent} from "./show-users/show-users.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {ReadUserComponent} from "./read-user/read-user.component";
import {CreateBookComponent} from "./create-book/create-book.component";
import {ShowBooksComponent} from "./show-books/show-books.component";
import {UpdateBookComponent} from "./update-book/update-book.component";
import {ReadBookComponent} from "./read-book/read-book.component";

const routes: Routes = [

  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: ShowUsersComponent},
  {path: 'add-user', component: CreateUserComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'user-details/:id', component: ReadUserComponent},
  {path: 'books', component: ShowBooksComponent},
  {path: 'add-book', component: CreateBookComponent},
  {path: 'update-book', component: UpdateBookComponent },
  {path: 'book-details/:id', component: ReadBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
