import { randomUUID } from 'crypto';
import { Address } from './address';
import { CompanyProps } from './company';

//Employee principal interface, we use to create and list
export interface EmployeeProps {
  name: string;
  CPF: string;
  CTPS: string;
  job: string;
  sector: string;
  photoUrl?: string;
  salary: number;
  admissionDate: Date;
  birthDate: Date;
  address: Address;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
  companyId: string;
}

//Update employee interface
export interface EmployeeUpdateProps {
  id: string;
  name?: string;
  CPF?: string;
  CTPS?: string;
  job?: string;
  sector?: string;
  photoUrl?: string;
  salary?: number;
  admissionDate?: Date;
  birthDate?: Date;
  address?: Address;
}

export class Employee {
  private _id: string;
  private employeeProps: EmployeeProps;

  constructor(props: EmployeeProps, id?: string, createdAt?: Date) {
    this._id = id ?? randomUUID();
    this.employeeProps = {
      ...props,
      createdAt: createdAt ?? new Date(),
      updatedAt: new Date(),
      active: true,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.employeeProps.name;
  }
  public set name(name: string) {
    this.employeeProps.name = name;
  }

  public get CPF(): string {
    return this.employeeProps.CPF;
  }
  public set CPF(CPF: string) {
    this.employeeProps.CPF = CPF;
  }

  public get CTPS(): string {
    return this.employeeProps.CTPS;
  }
  public set CTPS(CTPS: string) {
    this.employeeProps.CTPS = CTPS;
  }

  public get job(): string {
    return this.employeeProps.job;
  }
  public set job(job: string) {
    this.employeeProps.job = job;
  }

  public get sector(): string {
    return this.employeeProps.sector;
  }
  public set sector(sector: string) {
    this.employeeProps.sector = sector;
  }

  public get photoUrl(): string {
    return this.employeeProps.photoUrl;
  }
  public set photoUrl(photoUrl: string) {
    this.employeeProps.photoUrl = photoUrl;
  }

  public get companyId(): string {
    return this.employeeProps.companyId;
  }
  public set companyId(companyId: string) {
    this.employeeProps.companyId = companyId;
  }

  public get salary(): number {
    return this.employeeProps.salary;
  }
  public set salary(salary: number) {
    this.employeeProps.salary = salary;
  }

  public get admissionDate(): Date {
    return this.employeeProps.admissionDate;
  }
  public set admissionDate(admissionDate: Date) {
    this.employeeProps.admissionDate = admissionDate;
  }

  public get birthDate(): Date {
    return this.employeeProps.birthDate;
  }
  public set birthDate(birthDate: Date) {
    this.employeeProps.birthDate = birthDate;
  }

  public get updatedAt(): Date {
    return this.employeeProps.updatedAt;
  }
  public set updatedAt(updatedAt: Date) {
    this.employeeProps.updatedAt = updatedAt;
  }

  public get address(): Address {
    return this.employeeProps.address;
  }
  public set address(address: Address) {
    this.employeeProps.address = address;
  }
}
