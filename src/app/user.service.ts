import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  private userListUpdated = new BehaviorSubject<void>(undefined);
  userListUpdated$ = this.userListUpdated.asObservable();

  constructor(private http: HttpClient) {
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(this.baseUrl + '/' + id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getUsersList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  searchUsers(lastName: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '?lastName=' + lastName);
  }

  notifyUserListChanged(): void {
    this.userListUpdated.next();
  }

  getUserLoans(userId: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/' + userId + '/loans');
  }

  returnBook(loanId: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/loans/${loanId}/finish`, {});
  }
}
