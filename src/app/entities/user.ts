import { randomUUID } from 'crypto';

//User principal interface
export interface UserProps {
  id?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

//Update user interface
export interface UserUpdateProps {
  id: string;
  password?: string | null;
  active?: boolean;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(email: string, password: string, id?: string, createdAt?: Date) {
    //Making this I give the option to pass an id to create a user
    this._id = id ?? randomUUID();
    this.props = {
      email: email,
      password: password,
      createdAt: createdAt ?? new Date(),
      updatedAt: new Date(),
      active: true,
    };
  }

  public get id(): string {
    return this._id;
  }

  public set email(email: string) {
    this.props.email = email;
  }
  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }
  public get password(): string {
    return this.props.password;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set active(active: boolean) {
    this.props.active = active;
  }
  public get active() {
    return this.props.active;
  }
}
