export class Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  genre: string;

  constructor(id: number, title: string, author: string, isbn: string, genre: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.genre = genre;
  }
}


