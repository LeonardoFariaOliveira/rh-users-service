import { randomUUID } from 'crypto';
import { User, UserProps } from './user';
import { Address } from './address';

//Company principal interface, we use to create and list.
// Extends user's interface to inherit user's properties
export interface CompanyProps extends UserProps {
  comporateName: string;
  popularName: string;
  cnpj: string;
  photoUrl?: string;
  phoneNumber: string;
  address: Address
}

//Update company interface
export interface CompanyUpdateProps {
  id: string;
  comporateName?: string;
  popularName?: string;
  cnpj?: string;
  phoneNumber?: string;
  photoUrl?: string
  address?: Address
}

//I've made this inheritence 'cause of in the future if we need more user access,
// is easiest to do if we have a parent class
export class Company extends User {
  private companyProps: CompanyProps;

  constructor(props: CompanyProps, id?: string) {
    //here I pass the email and password to user's class 'cause I think 
    // is better that user takes the auth responsibility 
    super(props.email, props.password, id ?? randomUUID());
    this.companyProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
      active: props.active ?? true,
    };
  }

  public get comporateName(): string {
    return this.companyProps.comporateName;
  }
  public set comporateName(comporateName:string){
    this.companyProps.comporateName = comporateName;
  }

  public get popularName(): string {
    return this.companyProps.popularName;
  }
  public set popularName(popularName:string){
    this.companyProps.popularName = popularName;
  }

  public get cnpj(): string {
    return this.companyProps.cnpj;
  }
  public set cnpj(cnpj:string){
    this.companyProps.cnpj = cnpj;
  }

  public get phoneNumber(): string {
    return this.companyProps.phoneNumber;
  }
  public set phoneNumber(phoneNumber:string){
    this.companyProps.phoneNumber = phoneNumber;
  }

  public get photoUrl(): string {
    return this.companyProps.photoUrl;
  }
  public set photoUrl(photoUrl:string){
    this.companyProps.photoUrl = photoUrl;
  }

  public get updatedAt(): Date {
    return this.companyProps.updatedAt;
  }
  public set updatedAt(updatedAt:Date){
    this.companyProps.updatedAt = updatedAt;
  }

  public get address():Address {
    return this.companyProps.address
  }
  public set address(address:Address) {
    this.companyProps.address = address
  }

}
