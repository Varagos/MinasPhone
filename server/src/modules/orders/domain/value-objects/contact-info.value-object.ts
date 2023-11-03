import { ValueObject } from '@libs/ddd';
import { Email, PhoneNumber } from '@libs/ddd/standard-value-objects';

export interface ContactInfoProps {
  firstName: string;
  lastName: string;
  email: Email;
  phone: PhoneNumber;
}

export interface CreateContactInfoProps {
  firstName: string;
  lastName: string;
  email: Email;
  phone: PhoneNumber;
}

export class ContactInfo extends ValueObject<ContactInfoProps> {
  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): string {
    return this.props.email.value;
  }

  get phone(): string {
    return this.props.phone.value;
  }

  protected validate(props: ContactInfoProps): void {
    // pass
  }
}
