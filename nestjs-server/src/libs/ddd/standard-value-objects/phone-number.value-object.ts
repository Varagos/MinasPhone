import { ArgumentInvalidException } from '@libs/exceptions';
import { ValueObject } from '../value-object.base';
import { isPhoneNumber } from 'class-validator';

export interface PhoneNumberProps {
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  get value(): string {
    return this.props.value;
  }

  protected validate(props: PhoneNumberProps): void {
    const isValidPhoneNumber = isPhoneNumber(props.value, 'GR');
    if (!isValidPhoneNumber) {
      throw new ArgumentInvalidException(
        `Invalid greek phone number: ${props.value}`,
      );
    }
  }
}
