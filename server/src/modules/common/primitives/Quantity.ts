import { Guard } from '../../../shared/core/Guard.js';
import { Result } from '../../../shared/core/Result.js';
import { ValueObject } from '../../../shared/domain/ValueObject.js';

interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  public static ZERO: Quantity = new Quantity({ value: 0 });
  private static MAX_VALUE = 1_000_000;

  get value(): number {
    return this.props.value;
  }

  private constructor(props: QuantityProps) {
    super(props);
  }

  public static create(props: QuantityProps): Result<Quantity> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'price');

    if (nullGuardResult.isFailure) {
      return Result.fail<Quantity>(nullGuardResult.getErrorValue());
    }

    if (props.value < 0) {
      return Result.fail('Quantity cannot be less than zero.');
    }
    if (!Number.isInteger(props.value)) {
      return Result.fail('Quantity must be an integer.');
    }

    return Result.ok<Quantity>(new Quantity(props));
  }

  public add(toAdd: Quantity): Quantity {
    const quantity = this.value;
    const toAddValue = toAdd.value;
    return new Quantity({ value: quantity + toAddValue });
  }
}
