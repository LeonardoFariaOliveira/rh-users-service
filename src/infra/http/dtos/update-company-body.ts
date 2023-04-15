import { Length, IsOptional } from 'class-validator';

//This class validate the body as a middleware
export class UpdateCompanyBody {
  @IsOptional()
  @Length(3, 25, {
    message: 'Razão social deve possuir no mínimo três letras e no máximo 25',
  })
  corporateName?: string;

  @IsOptional()
  @Length(3, 15, {
    message: 'Nome fantazia deve possuir no mínimo três letras e no máximo 25',
  })
  popularName?: string;

  @IsOptional()
  @Length(13, 13, {
    message: 'CNPJ Inválido',
  })
  cnpj?: string;

  @IsOptional()
  @Length(9, 13, {
    message: 'Número de contato invalido',
  })
  phoneNumber?: string;

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
