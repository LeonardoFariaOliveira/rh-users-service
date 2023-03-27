import { randomUUID } from 'crypto';

//Admin principal interface, we use to create and list
export interface AdminProps {
  id?: string;
  name: string;
  user: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

//Update admin interface
export interface AdminUpdateProps {
  id: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export class Admin {
  private _id?: string;
  private props: AdminProps;

  //Constructor to initialize the object Admin and responsable to create self object
  constructor(props:AdminProps, id?: string, createdAt?: Date) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: createdAt ?? new Date(),
      updatedAt: new Date(),
      active: true,
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }
  public get name(): string {
    return this.props.name;
  }

  public set user(user: string) {
    this.props.name = user;
  }
  public get user(): string {
    return this.props.user;
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
