import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

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
}
