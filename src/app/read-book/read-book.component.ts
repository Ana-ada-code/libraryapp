import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent implements OnInit {

  id: number = 0;
  book: Book = new Book(0, '', '', '','');

  constructor(private route: ActivatedRoute, private router: Router,
              private bookService: BookService) { }

  ngOnInit() {
    this.book = new Book(0, '', '', '','');

    this.id = this.route.snapshot.params['id'];

    this.bookService.getBook(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['books']);
  }
}
