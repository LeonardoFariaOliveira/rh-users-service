import { Address } from '@app/entities/address';
import { Company, CompanyProps } from '@app/entities/company';
import { AccessCryptography } from '@infra/http/utils/access-cryptography';
import { Company as rawCompany } from '@prisma/client';
import { Address as rawAddress } from '@prisma/client';
export class PrismaCompanyMapper {
  static accessCryptography = new AccessCryptography();

  //Here we take data from domain layer ans mask to persistence layer
  static async toPrisma(company: CompanyProps) {
    const password = this.accessCryptography.encrypt(company.password);
    return {
      id: company.id,
      email: company.email,
      password: password,
      corporateName: company.corporateName,
      popularName: company.popularName,
      CNPJ: company.cnpj,
      phoneNumber: company.phoneNumber,
      photoUrl: company.photoUrl,
      address: {
        id: company.address.id,
        country: company.address.countryValue,
        countryArea: company.address.countryAreaValue,
        city: company.address.cityValue,
        neighboor: company.address.neighboorValue,
        street: company.address.streetValue,
        number: company.address.numberValue,
      },
    };
  }

  //Here we take data from persistence layer ans mask to domain layer
  static toDomain(raw: rawCompany, rawAddress: rawAddress): Company {
    // const companyRaw =
    return new Company(
      {
        email: raw.email,
        password: raw.password,
        corporateName: raw.corporateName,
        popularName: raw.popularName,
        cnpj: raw.CNPJ,
        phoneNumber: raw.phoneNumber,
        photoUrl: raw.photoUrl,
        active: raw.active,
        address: new Address(
          rawAddress.country,
          rawAddress.countryArea,
          rawAddress.city,
          rawAddress.neighboor,
          rawAddress.street,
          rawAddress.number,
        ),
      },
      raw.id,
    );

    // console.log(c);
    // return c;
  }

  //Here we take data from persistence layer ans mask to domain layer, decrypting the password to the login
  static toDomainLogin(raw: rawCompany, rawAddress: rawAddress): Company {
    const password = this.accessCryptography.decrypt(raw.password);
    return new Company(
      {
        email: raw.email,
        password: password,
        corporateName: raw.corporateName,
        popularName: raw.popularName,
        cnpj: raw.CNPJ,
        phoneNumber: raw.phoneNumber,
        photoUrl: raw.photoUrl,
        address: new Address(
          rawAddress.country,
          rawAddress.countryArea,
          rawAddress.city,
          rawAddress.neighboor,
          rawAddress.street,
          rawAddress.number,
        ),
      },
      raw.id,
    );
  }
}
