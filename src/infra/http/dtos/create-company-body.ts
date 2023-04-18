import { Length, IsEmail, IsOptional } from 'class-validator';

//This class validate the body as a middleware
export class CreateCompanyBody {
  @IsEmail()
  @Length(15, 120, {
    message: 'E-mail inválido',
  })
  email: string;

  @Length(8, 15, {
    message: 'Senha deve possuir no mínimo oito letras e no máximo 15',
  })
  password: string;

  @Length(3, 25, {
    message: 'Razão social deve possuir no mínimo três letras e no máximo 25',
  })
  corporateName: string;

  @Length(3, 15, {
    message: 'Nome fantazia deve possuir no mínimo três letras e no máximo 25',
  })
  popularName: string;

  @Length(13, 25, {
    message: 'CNPJ Inválido',
  })
  CNPJ: string;

  @Length(9, 13, {
    message: 'Número de contato invalido',
  })
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
