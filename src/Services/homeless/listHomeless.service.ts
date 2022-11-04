import AppDataSource from "../../data-source";
import { Homeless } from "../../entities/homeless.entity";

const listHomelessService = async (): Promise<Homeless[]> => {
  const homelessRepository = AppDataSource.getRepository(Homeless);

  const homelessList = await homelessRepository.find();

  return homelessList;
};

export default listHomelessService;