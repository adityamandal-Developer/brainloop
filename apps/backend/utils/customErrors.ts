export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string = "Authentication failed") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export class ServerError extends CustomError {
  constructor(message: string = "Something went wrong with our system") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = "Validation failed") {
    super(message, 400);
    this.name = "ValidationError";
  }
}
export class CookieError extends CustomError {
  constructor(message: string = "Cookie Validation failed") {
    super(message, 400);
    this.name = "CookieError";
  }
}

export class TokenError extends CustomError {
  constructor(message: string = "Cookie Validation failed") {
    super(message, 400);
    this.name = "TokenError";
  }
}
