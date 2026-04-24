export class InvalidParameters extends Error {}
export class AddressError extends Error {}
export class NotFoundError extends Error {}
export class UnexpectedError extends Error {}
export class TemplateError extends Error {}
export class IdempotentError extends Error {}
export class EnvironmentError extends Error {}
export class ValidationError extends Error {
  constructor(public readonly issues: unknown) {
    super();
  }
}
