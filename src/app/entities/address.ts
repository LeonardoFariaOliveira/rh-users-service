import { randomUUID } from 'crypto';

export class Address {
  private _id: string;
  private country: string;
  private countryArea: string;
  private city: string;
  private neighboor: string;
  private street: string;
  private number: string;

  //Constructor to initialize the object Address and responsable to create self object
  constructor(
    country: string,
    countryArea: string,
    city: string,
    neighboor: string,
    street: string,
    number: string,
    id?: string,
  ) {
    //Making this I give the option to pass an id to create an address
    this._id = id ?? randomUUID();
    (this.country = country),
      (this.countryArea = countryArea),
      (this.city = city),
      (this.street = street),
      (this.neighboor = neighboor),
      (this.number = number);
  }

  public get id(): string {
    return this._id;
  }

  public get countryValue(): string {
    return this.country;
  }

  public get countryAreaValue(): string {
    return this.countryArea;
  }

  public get cityValue(): string {
    return this.city;
  }

  public get neighboorValue(): string {
    return this.neighboor;
  }

  public get streetValue(): string {
    return this.street;
  }

  public get numberValue(): string {
    return this.number;
  }
}
