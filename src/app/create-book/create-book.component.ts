import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Router} from '@angular/router';
import {Book} from '../book';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) {
  }

  book: Book = new Book(undefined!, '', '', '', '');
  submitted = false;

  ngOnInit() {
  }

  saveBook() {
    this.bookService.createBook(this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book(undefined!, '', '', '', '');
    this.submitted = true;
    this.gotoBookList();
  }

  onSubmit() {
    this.saveBook();
  }

  gotoBookList() {
    this.router.navigate(['/books']);
  }

}
