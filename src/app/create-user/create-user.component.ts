import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  user: User = new User(undefined!, '', '', '');
  submitted = false;

  ngOnInit() {
  }

  saveUser() {
    this.userService.createUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User(undefined!, '', '', '');
    this.submitted = true;
    this.gotoUserList();
  }

  onSubmit() {
    this.saveUser();
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }

}
