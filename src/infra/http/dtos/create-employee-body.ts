import {
  Length,
  IsEmail,
  IsOptional,
  IsDecimal,
  IsUUID,
} from 'class-validator';

//This class validate the body as a middleware
export class CreateEmployeeBody {
  @Length(3, 60)
  name: string;

  @Length(9, 14)
  cpf: string;

  @Length(11, 14)
  ctps: string;

  @Length(3, 25)
  job: string;

  @Length(2, 25)
  sector: string;

  @Length(10, 25)
  admissionDate: string;

  @Length(10, 25)
  birthDate: string;

  @IsOptional()
  photoUrl?: string;

  @Length(4, 6)
  @IsDecimal()
  salary: number;

  address: {
    country: string;
    countryArea: string;
    city: string;
    neighboor: string;
    street: string;
    number: string;
  };

  @IsUUID()
  companyId: string;
}
