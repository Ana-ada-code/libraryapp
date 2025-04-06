import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Observable, of} from 'rxjs';
import {Book} from '../book';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit {

  books: Observable<Book[]> | undefined;
  searchText: string = '';

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit(): void {
    this.bookService.bookListUpdated$.subscribe(() => {
      this.fetchBookList();
    });
    this.fetchBookList();
  }

  fetchBookList() {
    this.books = this.bookService.getBooksList();
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id)
      .subscribe(
        data => {
          console.log(data);
          this.fetchBookList();
        },
        error => console.log(error));
  }

  bookDetails(id: number) {
    this.router.navigate(['book-details', id]);
  }

  updateBook(book: Book) {
    this.router.navigate(['update-book', book]);
  }

  onSearchBook() {
    if (this.searchText.trim() === '') {
      this.fetchBookList();
    } else {
      this.bookService.searchBooks(this.searchText)
        .subscribe(data => this.books = of(data));
    }
  }

}
