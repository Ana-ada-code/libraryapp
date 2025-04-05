export class Book {
  id: number;
  title: String;
  author: String;
  isbn: String;
  genre: String;

  constructor(id: number, title: String, author: String, isbn: String, genre: String) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.genre = genre;
  }
}


