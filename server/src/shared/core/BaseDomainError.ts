interface IDomainError {
  message: string;
}

export abstract class BaseDomainError implements IDomainError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
