import {
  Length,
  IsEmail,
  IsOptional,
  IsDecimal,
  IsUUID,
} from 'class-validator';

//This class validate the body as a middleware
export class CreateEmployeeBody {
  @Length(3, 60, {
    message: 'Nome deve possuir no mínimo três letras e no máximo 25',
  })
  name: string;

  @Length(9, 14, { message: 'CPF inválido' })
  cpf: string;

  @Length(11, 14, { message: 'CTPS inválido' })
  ctps: string;

  @Length(3, 25, {
    message: 'Cargo deve possuir no mínimo três letras e no máximo 25',
  })
  job: string;

  @Length(2, 25, {
    message: 'Setor deve possuir no mínimo duas letras e no máximo 25',
  })
  sector: string;

  @Length(10, 25, {
    message: 'Data de admissão inválida',
  })
  admissionDate: string;

  @Length(10, 25, {
    message: 'Data de nascimento inválida',
  })
  birthDate: string;

  @IsOptional()
  photoUrl?: string;

  @Length(4, 6, {
    message: 'Salário não deve possuir mais de 6 dígitos',
  })
  @IsDecimal({
    decimal_digits: '0,',
  })
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
