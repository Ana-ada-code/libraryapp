import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {
  }

  getBook(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createBook(book : Book): Observable<any> {
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

  searchBooks(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '?title=' + title);
  }
}
