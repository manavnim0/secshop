import { ValidationError } from "joi";
import { customError } from "./custom-error";

export class RequestValidationError extends customError {
  statusCode = 400;

  constructor(public errors: ValidationError) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.details.map((err) => ({
      message: err.message,
      field: err.path.join(".")
    }));
  }
}
