import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createHomelessService from "../Services/homeless/createHomeless.service";

const createHomelessController = async (req: Request, res: Response) => {
  try {
    const { name, age, picture } = req.body;

    const createdHomeless = await createHomelessService({name, age, picture});

    return res.status(201).json(createdHomeless);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

export { createHomelessController };