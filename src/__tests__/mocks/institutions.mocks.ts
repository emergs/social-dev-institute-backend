import { IInstitutions } from "../../interfaces/institutions";

export const mockedInstitution: IInstitutions = {
  name: "Billy",
  email: "billy@mail.com",
  cnpj: "12345678912345",
  address: "Alameda Sagrado Coração",
  isActive: true,
  phone: "4133224455",
  password: "123456",
};

export const mockedInstitutionInvalidCNPJ: IInstitutions = {
  name: "Billy",
  email: "billy@mail.com",
  cnpj: "123456789123456789",
  address: "Alameda Sagrado Coração",
  isActive: true,
  phone: "4133224455",
  password: "123456",
};
