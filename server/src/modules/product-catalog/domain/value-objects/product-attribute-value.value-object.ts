import { ValueObject } from '@libs/ddd';
import { AggregateID } from '@libs/ddd/index';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ProductAttributeValueProps {
  valueId: string | null;
  textValue: string | null;
  numericValue: number | null;
  booleanValue: boolean | null;
}

export class ProductAttributeValue extends ValueObject<ProductAttributeValueProps> {
  get valueId(): string | null {
    return this.props.valueId;
  }

  get textValue(): string | null {
    return this.props.textValue;
  }

  get numericValue(): number | null {
    return this.props.numericValue;
  }
  get booleanValue(): boolean | null {
    return this.props.booleanValue;
  }

  public isString(): boolean {
    return this.props.textValue !== null && this.props.textValue !== undefined;
  }

  public isNumeric(): boolean {
    return (
      this.props.numericValue !== null && this.props.numericValue !== undefined
    );
  }

  public isBoolean(): boolean {
    return (
      this.props.booleanValue !== null && this.props.booleanValue !== undefined
    );
  }

  public isEnum(): boolean {
    return this.props.valueId !== null && this.props.valueId !== undefined;
  }

  public getType(): 'string' | 'number' | 'boolean' | 'enum' {
    if (this.isString()) return 'string';
    if (this.isNumeric()) return 'number';
    if (this.isBoolean()) return 'boolean';
    return 'enum';
  }

  static create(props: ProductAttributeValueProps): ProductAttributeValue {
    try {
      return new ProductAttributeValue(props);
    } catch (e: any) {
      throw new ArgumentInvalidException(
        e.message ||
          'Failed to create ProductAttributeValue value object due to invalid arguments',
      );
    }
  }

  protected validate(props: ProductAttributeValueProps): void {
    const { valueId, textValue, numericValue, booleanValue } = props;
    // Validate: exactly one value must be set
    const valuesSet = [valueId, textValue, numericValue, booleanValue].filter(
      (v) => v !== null && v !== undefined,
    );

    if (valuesSet.length !== 1) {
      throw new Error('Exactly one value type must be set');
    }
  }
}
