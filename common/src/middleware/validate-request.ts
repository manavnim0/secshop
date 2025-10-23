import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (schema: ObjectSchema) => (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) throw new RequestValidationError(error);
  next();
};
