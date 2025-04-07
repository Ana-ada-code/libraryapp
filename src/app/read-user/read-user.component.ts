import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Route} from '@angular/router';
import {User} from '../user';
import {Loan} from "../loan";


@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {

  id: number = 0;
  user: User = new User(0, '', '', '');
  loans: Loan[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(data => {
      this.user = data;
    });
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.userService.getUserLoans(this.id).subscribe(data => {
      this.loans = data;
    });
  }

  returnBook(loanId: number) {
    this.userService.returnBook(loanId).subscribe({
      next: () => {
        const userId = Number(this.route.snapshot.paramMap.get('id'));
        this.userService.getUserLoans(userId).subscribe(loans => this.loans = loans);
      },
      error: (err) => console.error('Error returning book:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}

