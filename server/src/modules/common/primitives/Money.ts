import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface MoneyProps {
  value: number;
}

export class Money extends ValueObject<MoneyProps> {
  public static ZERO: Money = new Money({ value: 0 });
  private static MAX_VALUE = 1_000_000;

  get value(): number {
    return this.props.value;
  }

  private constructor(props: MoneyProps) {
    super(props);
  }

  public static create(props: MoneyProps): Result<Money> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'price');

    if (nullGuardResult.isFailure) {
      return Result.fail<Money>(nullGuardResult.getErrorValue());
    }

    if (props.value < 0) {
      return Result.fail('Money cannot be less than zero.');
    }
    if (props.value > Money.MAX_VALUE) {
      return Result.fail(
        'Money cannot be greater than ' + Money.MAX_VALUE + '.',
      );
    }

    return Result.ok<Money>(new Money(props));
  }

  public multi(factor: number): Money {
    const money = this.value;
    return new Money({ value: money * factor });
  }

  public add(money: Money): Money {
    return new Money({ value: this.value + money.value });
  }
}
