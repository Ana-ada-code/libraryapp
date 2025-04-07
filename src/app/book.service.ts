import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from './book';
import {BookLoan} from "./book-loan";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = 'http://localhost:8080/api';
  private baseUrl = 'http://localhost:8080/api/books';

  private bookListUpdated = new BehaviorSubject<void>(undefined);
  bookListUpdated$ = this.bookListUpdated.asObservable();

  constructor(private http: HttpClient) {
  }

  getBook(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createBook(book: Book): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  updateBook(id: number, book: Book): Observable<any> {
    return this.http.put(this.baseUrl + '/' + id, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getBooksList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  searchBooks(text: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '?text=' + text);
  }

  notifyBookListChanged() {
    this.bookListUpdated.next();
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/genres/names');
  }

  getBookLoans(bookId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/' + bookId + '/loans');
  }

  returnBook(loanId: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/loans/${loanId}/finish`, {});
  }

  searchUsers(lastName: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/api/users?lastName=${lastName}`);
  }

  borrowBook(loan: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/loans`, loan);
  }

}
