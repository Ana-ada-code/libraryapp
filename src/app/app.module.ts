import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReadUserComponent } from './read-user/read-user.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { ShowBooksComponent } from './show-books/show-books.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ReadUserComponent,
    ShowUsersComponent,
    UpdateUserComponent,
    CreateBookComponent,
    ShowBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
