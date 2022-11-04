import AppDataSource from "../../data-source";
import { Homeless } from "../../entities/homeless.entity";
import { AppError } from "../../errors/appError";
import { IHomelessRequest } from "../../interfaces/homeless";

const createHomelessService = async ({name, age, picture}: IHomelessRequest): Promise<Homeless> => {
  const homelessRepository = AppDataSource.getRepository(Homeless);

  // const dataContent  = Object.keys(data);

  // dataContent.map((elem) => {
  //   if (!elem) throw new AppError(400, `${elem} is missing`);
  // });
  
  if (!name) {
    throw new AppError(400, 'Name is missing');
  };

  if (!age) {
    throw new AppError(400, 'Age is missing');
  }; 

  const newHomeless = new Homeless();
  newHomeless.name = name;
  newHomeless.age = age;
  newHomeless.picture = picture ? picture : null;
  // newHomeless.institution = data.institution;

  homelessRepository.create(newHomeless);
  await homelessRepository.save(newHomeless);

  return newHomeless;
};

export default createHomelessService;