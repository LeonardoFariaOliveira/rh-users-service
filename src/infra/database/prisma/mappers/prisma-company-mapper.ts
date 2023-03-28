import { Company, CompanyProps } from '@app/entities/company';
import { AdminAccessEncrypt } from '@infra/http/utils/admin-access-encrypt';
import { Company as rawCompany } from '@prisma/client';

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
      corporateName: company.comporateName,
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
      /*
id String @id
  email String
  password String
  corporateName String
  popularName String
  CNPJ String
  phoneNumber String
  photoUrl String?
  createdAt DateTime? @default(now())
  updatedAt DateTime? @default(now())
  active Boolean @default(true)
  addressId Address?
    */
    };
  }

  //Here we take data from persistence layer ans mask to domain layer
  //   static toDomain(raw: rawCompany) {
  //     return new Company(
  //       {
  //         name: raw.name,
  //         user: raw.user,
  //         password: raw.password,
  //         active: raw.active,
  //       },
  //       raw.id,
  //     );
  //   }
}
