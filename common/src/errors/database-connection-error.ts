import { customError } from "./custom-error";

export class DatabaseConnectionError extends customError {
  statusCode = 500;
  reason = "Database connection failed";

  constructor() {
    super("Database connection error");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
