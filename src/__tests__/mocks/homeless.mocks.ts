import { IHomelessRequest } from "../../interfaces/homeless";

const homelessData: IHomelessRequest = {
  age: '23',
  institution: 'Novo dia',
  name: 'Neto Calegari',
  picture: 'https://www.coalitionforthehomeless.org/wp-content/uploads/2022/03/SOTH-Website-Mobile-Banner-Scaled-copy-1-scaled.jpeg'
};

const institutionLogin = {
  email: 'novodia@email.com',
  password: '12345'
};

const createInstitution = {
	name: "Novo dia",
	cnpj: "70.158.970/0001-97",
	address: "Av. 9 de julho, 135 - SP",
	phone: "11970707070",
	email: "novodia@email.com",
	password: "12345",
};

export { homelessData, institutionLogin, createInstitution };