import { ErrorRequestHandler } from "express";
import { customError } from "./custom-error";
import { logger } from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof customError) {
    logger.error(`[${err.constructor.name}] ${err.message}`);
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  logger.error(err);
  res.status(500).send({ errors: [{ message: "Internal server error" }] });
};
