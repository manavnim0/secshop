import { customError } from "./custom-error";

export class NotConnectedError extends customError {
    statusCode =  500;

    constructor(){
        super("Cannot establish connection with MongoDB");
        Object.setPrototypeOf(this, NotConnectedError.prototype);
    }
    serializeErrors() {
        return [{message: "Connection Error!"}]      
    }
}
