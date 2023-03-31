import { randomUUID } from 'crypto';
import { CompanyProps } from './company';
import { AdminProps } from './admin';

//PassswordResetRequest principal interface, we use to create and list
export interface PasswordResetRequestProps {
  status: number;
  company: CompanyProps;
  admin: AdminProps;
  createdAt?: Date;
  updatedAt?: Date;
}

//Update passswordResetRequest interface
export class PasswordResetRequest {
  private _id: string;
  private props: PasswordResetRequestProps;

  constructor(props: PasswordResetRequestProps, id?: string) {
    //Making this I give the option to pass an id to create a passordResetRequest
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get status(): number {
    return this.props.status;
  }
  public set status(status: number) {
    this.props.status = status;
  }

  public get company(): CompanyProps {
    return this.props.company;
  }
  public set company(company: CompanyProps) {
    this.props.company = company;
  }

  public get admin(): AdminProps {
    return this.props.admin;
  }
  public set admin(admin: AdminProps) {
    this.props.admin = admin;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
