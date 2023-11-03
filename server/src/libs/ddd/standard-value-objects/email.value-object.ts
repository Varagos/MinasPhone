import { ArgumentInvalidException } from '@libs/exceptions';
import { ValueObject } from '../value-object.base';
import { isEmail } from 'class-validator';

export interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  get value(): string {
    return this.props.value;
  }

  protected validate(props: EmailProps): void {
    const isValidEmail = isEmail(props.value);
    if (!isValidEmail) {
      throw new ArgumentInvalidException(`Invalid email: ${props.value}`);
    }
  }
}
