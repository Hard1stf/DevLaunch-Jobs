// Custom error type for API responses.
// Use this when you want to return an HTTP status code together
// with a descriptive error message from your server.
export class APIError extends Error {
  statusCode: number; // store the HTTP status code that describes the error

  constructor(statusCode: number, message: string) {
    // call the built-in Error constructor with the error message
    super(message);

    // make sure this instance is identified as an APIError
    this.name = 'APIError';
    // store the provided status code on this error object
    this.statusCode = statusCode;

    // correct the prototype chain so `instanceof APIError` works properly
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

//// this is cross-checks for "APIError.prototype".
// const error = new APIError(404, 'page not found');

// console.log(error instanceof APIError);
// console.log(error instanceof Error);
// console.log(error.name);
// console.log(error.message);
// console.log(error.statusCode);
