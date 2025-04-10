import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  id: number = 0;
  user: User = new User(undefined!, '', '', '');
  submitted = false;
  validationErrors: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User(undefined!, '', '', '');

    this.id = this.route.snapshot.params['id'];

    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
  }

  onSubmit(): void {
    this.submitted = true;

    const peselRegex = /^\d{11}$/;
    if (!peselRegex.test(this.user.pesel)) {
      this.validationErrors = ['PESEL must be 11 digits'];
      return;
    }

    this.userService.updateUser(this.user.id, this.user).subscribe(
      () => {
        this.userService.notifyUserListChanged();
        this.submitted = true;
        this.router.navigate(['/users']);
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

}
