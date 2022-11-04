import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createHomelessService from "../Services/homeless/createHomeless.service";
import getByIdService from "../Services/homeless/getById.service";
import listHomelessService from "../Services/homeless/listHomeless.service";

const createHomelessController = async (req: Request, res: Response) => {
  try {
    const { name, age, picture , institution} = req.body;

    const createdHomeless = await createHomelessService({name, age, picture, institution});

    return res.status(201).json(createdHomeless);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const listHomelessController = async (req: Request, res: Response) => {
  const homelessList = await listHomelessService();

  return res.status(200).json(homelessList);
};

const getByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const homeless = await getByIdService(id);

    return res.status(200).json(homeless);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };  
};

export { createHomelessController, listHomelessController, getByIdController };