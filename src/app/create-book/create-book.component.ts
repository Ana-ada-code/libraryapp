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
  genres: string[] = [];
  submitted = false;
  validationErrors: string[] = [];

  ngOnInit() {
    this.bookService.getGenres().subscribe(
      data => this.genres = data,
      error => console.error(error)
    );
  }

  onSubmit() {
    this.submitted = true;

    this.bookService.createBook(this.book).subscribe(
      data => {
        console.log(data);
        this.gotoBookList();
      },
      error => {
        let errorMsg = 'An unexpected error occurred';

        if (error?.error) {
          if (typeof error.error === 'object') {
            if (error.error.message) {
              errorMsg = error.error.message;
            } else {
              errorMsg = 'An unexpected error occurred';
            }
          } else if (typeof error.error === 'string') {
            errorMsg = error.error;
          }
        }
        this.validationErrors = [errorMsg];
      }
    );
  }

  gotoBookList() {
    this.router.navigate(['/books']);
  }

}
