import { Result } from '../../../../shared/core/Result.js';
import { ValueObject } from '../../../../shared/domain/ValueObject.js';

export type OrderContactInfoProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export class OrderContactInfo extends ValueObject<OrderContactInfoProps> {
  private constructor(props: OrderContactInfoProps) {
    super(props);
  }

  static create(props: OrderContactInfoProps): Result<OrderContactInfo> {
    return Result.ok(new OrderContactInfo(props));
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }
}
