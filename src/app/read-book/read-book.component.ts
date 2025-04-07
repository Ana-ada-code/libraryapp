import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Route} from '@angular/router';
import {Book} from '../book';
import {BookLoan} from '../book-loan';
import {User} from "../user";

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent implements OnInit {

  id: number = 0;
  book: Book = new Book(0, '', '', '', '');
  bookLoans: BookLoan[] = [];
  searchLastName: string = '';
  foundUsers: User[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private bookService: BookService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookService.getBook(this.id).subscribe(data => {
      this.book = data;
    });
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.bookService.getBookLoans(this.id).subscribe(data => {
      this.bookLoans = data;
    });
  }

  returnBook(loanId: number): void {
    this.bookService.returnBook(loanId).subscribe({
      next: () => {
        const bookId = Number(this.route.snapshot.paramMap.get('id'));
        this.bookService.getBookLoans(bookId).subscribe(bookLoans => this.bookLoans = bookLoans);
      },
      error: (err) => console.error('Error returning user:', err)
    });
  }

  list() {
    this.router.navigate(['books']);
  }

  searchUsers(): void {
    this.bookService.searchUsers(this.searchLastName).subscribe(users => {
      this.foundUsers = users;
    });
  }

  isBookAvailable(): boolean {
    return !this.bookLoans.some(loan => !loan.finish);
  }

  borrowBook(userId: number): void {
    const loan = {
      start: new Date().toISOString().slice(0, 10),
      userId: userId,
      bookId: this.book.id
    };
    this.bookService.borrowBook(loan).subscribe({
      next: () => this.fetchLoans(),
      error: err => console.error('Error borrowing book:', err)
    });
  }
}
