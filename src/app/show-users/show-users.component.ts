import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Observable, of} from 'rxjs';
import {User} from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  users: Observable<User[]> | undefined;
  searchText: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.users = this.userService.getUsersList();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.fetchUserList();
        },
        error => console.log(error));
  }

  userDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  updateUser(user: User) {
    this.router.navigate(['update', user]);
  }

  onSearch() {
    if (this.searchText.trim() === '') {
      this.fetchUserList();
    } else {
      this.userService.searchUsers(this.searchText)
        .subscribe(data => this.users = of(data));
    }
  }

}
