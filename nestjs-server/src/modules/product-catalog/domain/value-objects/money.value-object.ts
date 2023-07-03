import { ValueObject } from '@libs/ddd';
import { Guard } from '@libs/guard';
import { ArgumentInvalidException } from '@libs/exceptions';
import Decimal from 'decimal.js';

// export enum CurrencyCode {
//   USD = 'USD',
//   EUR = 'EUR',
//   // add other currency codes as needed
// }

// Object.freeze(CurrencyCode);

export interface MoneyProps {
  amount: Decimal; // amount in Decimal to maintain precision
  //   currency: CurrencyCode; // Currency code (e.g. 'USD', 'EUR')
}

export class Money extends ValueObject<MoneyProps> {
  get amount(): Decimal {
    return this.props.amount;
  }

  //   get currency(): CurrencyCode {
  //     return this.props.currency;
  //   }

  /**
   * Creates a new Money value object
   * @param amount - Amount as a string or number
   * @param currency - Currency code
   */
  static create(amount: string | number): Money {
    try {
      if (typeof amount !== 'string' && typeof amount !== 'number') {
        throw new ArgumentInvalidException('Amount must be a string or number');
      }

      const decimalAmount = new Decimal(amount).toFixed(2); // Ensure two decimal points

      // const currencyCode = currency || CurrencyCode.EUR;
      //   if (!Money.isValidCurrencyCode(currency)) {
      //     throw new ArgumentInvalidException(
      //       `${currency} is not a valid currency code`,
      //     );
      //   }
      const finalAmount = new Decimal(decimalAmount);

      return new Money({ amount: finalAmount });
    } catch (e: any) {
      throw new ArgumentInvalidException(
        e.message || 'Failed to validate money value object',
      );
    }
  }

  add(moneyToAdd: Money): Money {
    // if (this.currency !== moneyToAdd.currency) {
    //   throw new ArgumentInvalidException(
    //     'Can only add money of the same currency',
    //   );
    // }

    const sum = this.amount.plus(moneyToAdd.amount);
    return Money.create(sum.toNumber());
  }

  getFormattedAmount(): string {
    return this.props.amount.toFixed(2);
  }

  protected validate(props: MoneyProps): void {
    const { amount } = props;

    if (!(amount instanceof Decimal)) {
      throw new ArgumentInvalidException(
        'Amount must be an instance of Decimal',
      );
    }

    // if (!Money.isValidCurrencyCode(currency)) {
    //   throw new ArgumentInvalidException(
    //     `${currency} is not a valid currency code`,
    //   );
    // }
  }

  //   private static isValidCurrencyCode(
  //     currency: string,
  //   ): currency is CurrencyCode {
  //     return Object.values(CurrencyCode).includes(currency as any);
  //   }
}
