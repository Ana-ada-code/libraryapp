import {Component, OnInit} from '@angular/core';
import {Book} from '../book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  id: number = 0;
  book: Book = new Book(undefined!, '', '', '', '');
  genres: string[] = [];
  submitted = false;
  validationErrors: string[] = [];


  constructor(private route: ActivatedRoute, private router: Router,
              private bookService: BookService) {
  }

  ngOnInit() {
    this.book = new Book(undefined!, '', '', '', '')

    this.bookService.getGenres().subscribe(
      data => this.genres = data,
      error => console.error(error)
    );

    this.id = this.route.snapshot.params['id'];

    this.bookService.getBook(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));
  }

  onSubmit(): void {
    this.submitted = true;
    this.validationErrors = [];

    this.bookService.updateBook(this.book.id, this.book).subscribe(
      () => {
        this.bookService.notifyBookListChanged();
        this.submitted = true;
        this.router.navigate(['/books']);
      },
      error => {
        let errorMsg = 'An unexpected error occurred';

        // Handle error from the backend
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

  }
