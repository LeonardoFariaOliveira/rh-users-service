import { Address } from '@app/entities/address';
import { Company, CompanyProps } from '@app/entities/company';
import { AdminAccessEncrypt } from '@infra/http/utils/admin-access-encrypt';
import { Company as rawCompany } from '@prisma/client';
import { Address as rawAddress } from '@prisma/client';
export class PrismaCompanyMapper {
  //Here we take data from domain layer ans mask to persistence layer
  static async toPrisma(company: CompanyProps) {
    const encrypter = new AdminAccessEncrypt();
    const enc = await encrypter.execute(company.password);
    const password = enc.encryptedData;
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
