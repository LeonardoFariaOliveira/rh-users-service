import {
  IsNotEmpty,
  IsUUID,
  Length,
  IsString,
  IsEmpty,
  IsDate,
  IsBoolean,
  IsEmail,
  IsOptional,
} from 'class-validator';

//This class validate the body as a middleware
export class CreateCompanyBody {
  @IsEmail()
  @Length(15, 120)
  email: string;

  @Length(8, 15)
  password: string;

  @Length(3, 25)
  corporateName: string;

  @Length(3, 15)
  popularName: string;

  @Length(13)
  CNPJ: string;

  @Length(9, 13)
  phoneNumber: string;

  @IsOptional()
  photoUrl?: string;

  address: {
    country: string;
    countryArea: string;
    city: string;
    neighboor: string;
    street: string;
    number: string;
  };
}
