import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  user: User = new User(undefined!, '', '', '');
  submitted = false;
  validationErrors: string[] = [];

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    const peselRegex = /^\d{11}$/;
    if (!peselRegex.test(this.user.pesel)) {
      this.validationErrors = ['PESEL must be 11 digits'];
      return;
    }

    this.userService.createUser(this.user).subscribe(
      data => {
        this.gotoUserList();
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

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
