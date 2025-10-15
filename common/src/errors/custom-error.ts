export abstract class customError extends Error {
    abstract statusCode: number;
    constructor(message: string){
        super(message);
        Object.setPrototypeOf(this, customError.prototype);
    }

    abstract serializeError(): {message: string; field: string} [];
}