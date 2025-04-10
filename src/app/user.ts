export class User {
  id: number;
  firstName: string;
  lastName: string;
  pesel: string;

  constructor(id: number, firstName: string, lastName: string, pesel: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.pesel = pesel;
  }
}
