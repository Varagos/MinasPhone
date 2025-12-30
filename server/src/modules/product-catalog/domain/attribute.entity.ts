import { AggregateID, AggregateRoot } from '@libs/ddd/index';
import { randomUUID } from 'crypto';
import { Err, Ok, Result } from 'oxide.ts';
import {
  AttributeValueEntity,
  CreateAttributeValueProps,
} from './attribute-value.entity';
import { Guard } from '@libs/guard';
import * as AttributeErrors from './attribute.errors';
import { ProductAttributeValue } from './value-objects/product-attribute-value.value-object';
import { Domain } from 'domain';

export const ValueTypes = [
  'string',
  'number',
  'boolean',
  'enum',
  'multiselect',
] as const;
export type ValueType = (typeof ValueTypes)[number];

export const InputTypes = [
  'text',
  'number',
  'select',
  'multiselect',
  'checkbox',
  'radio',
] as const;
export type InputType = (typeof InputTypes)[number];

interface AttributeProps {
  name: string;
  valueType: ValueType;
  inputType: InputType;
  unit: string | null;
  attributeValues: AttributeValueEntity[];
}

interface CreateAttributeProps {
  name: string;
  valueType: ValueType;
  inputType: InputType;
  unit: string | null;
  attributeValues: CreateAttributeValueProps[] | null;
}

export class AttributeEntity extends AggregateRoot<AttributeProps> {
  public readonly _id: AggregateID;

  get id(): AggregateID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get valueType(): ValueType {
    return this.props.valueType;
  }

  get inputType(): InputType {
    return this.props.inputType;
  }

  get unit(): string | null {
    return this.props.unit;
  }

  get attributeValues(): AttributeValueEntity[] {
    return this.props.attributeValues;
  }

  public delete() {
    // add domain event
  }

  public updateName(
    name: string,
  ): Result<
    void,
    | AttributeErrors.AttributeNameEmptyError
    | AttributeErrors.AttributeNameTooLongError
  > {
    const validation = AttributeEntity.validateName(name);
    if (validation.isErr()) {
      return validation;
    }
    this.props.name = name;
    return Ok(undefined);
  }

  public productValueConforms(
    attributeValue: ProductAttributeValue[],
  ): Result<void, AttributeErrors.AttributeValueValidationError> {
    const valueType = this.valueType;

    switch (valueType) {
      case 'string':
        return attributeValue.length === 1 && attributeValue[0].isString()
          ? Ok(void 0)
          : Err(
              new AttributeErrors.AttributeValueValidationError(
                attributeValue[0]?.getType(),
                valueType,
                this.id,
              ),
            );

      case 'number':
        return attributeValue.length === 1 && attributeValue[0].isNumeric()
          ? Ok(void 0)
          : Err(
              new AttributeErrors.AttributeValueValidationError(
                attributeValue[0]?.getType(),
                valueType,
                this.id,
              ),
            );
      case 'boolean':
        return attributeValue.length === 1 && attributeValue[0].isBoolean()
          ? Ok(void 0)
          : Err(
              new AttributeErrors.AttributeValueValidationError(
                attributeValue[0]?.getType(),
                valueType,
                this.id,
              ),
            );
      case 'enum':
        // Should be 1
        if (attributeValue.length !== 1) {
          return Err(
            new AttributeErrors.AttributeValueValidationError(
              `expected 1 value, got ${attributeValue.length}`,
              valueType,
              this.id,
            ),
          );
        }
        const enumValue = attributeValue[0];
        if (!enumValue.isEnum()) {
          return Err(
            new AttributeErrors.AttributeValueValidationError(
              enumValue.getType(),
              valueType,
              this.id,
            ),
          );
        }

        const enumValueId = enumValue.valueId!;
        const matchingValue = this.attributeValues.find(
          (av) => av.id.toString() === enumValueId,
        );
        if (!matchingValue) {
          return Err(
            new AttributeErrors.AttributeValueValidationError(
              'enum value id not found in attribute values',
              valueType,
              this.id,
            ),
          );
        }
        return Ok(void 0);
      case 'multiselect':
        // Can be multiple
        for (const value of attributeValue) {
          if (!value.isEnum()) {
            return Err(
              new AttributeErrors.AttributeValueValidationError(
                value.getType(),
                valueType,
                this.id,
              ),
            );
          }

          const enumValueId = value.valueId!;
          const matchingValue = this.attributeValues.find(
            (av) => av.id.toString() === enumValueId,
          );
          if (!matchingValue) {
            return Err(
              new AttributeErrors.AttributeValueValidationError(
                'enum value id not found in attribute values',
                valueType,
                this.id,
              ),
            );
          }
        }
        return Ok(void 0);
      default:
        // should not reach here
        throw new Error('Unhandled attribute value type in validation');
    }
  }

  public static create(
    props: CreateAttributeProps,
  ): Result<
    AttributeEntity,
    | AttributeErrors.AttributeNameEmptyError
    | AttributeErrors.AttributeNameTooLongError
    | AttributeErrors.InvalidValueTypeError
    | AttributeErrors.InvalidInputTypeError
    | AttributeErrors.EnumAttributeWithoutValuesError
    | AttributeErrors.NonEnumAttributeWithValuesError
    | AttributeErrors.AttributeValueEmptyError
    | AttributeErrors.DuplicateAttributeValueError
    | AttributeErrors.DuplicateAttributeValueCaseInsensitiveError
    | AttributeErrors.NegativeDisplayOrderError
  > {
    // Validate name
    const nameValidation = this.validateName(props.name);
    if (nameValidation.isErr()) {
      return nameValidation;
    }

    // Validate value type
    const valueTypeValidation = this.validateValueType(props.valueType);
    if (valueTypeValidation.isErr()) {
      return valueTypeValidation;
    }

    // Validate input type
    const inputTypeValidation = this.validateInputType(props.inputType);
    if (inputTypeValidation.isErr()) {
      return inputTypeValidation;
    }

    // Validate attribute values based on value type
    const valuesValidation = this.validateAttributeValues(
      props.valueType,
      props.attributeValues,
    );
    if (valuesValidation.isErr()) {
      return valuesValidation;
    }

    const id = randomUUID();

    let defaultAttributeValues: AttributeProps['attributeValues'] = [];
    if (props.attributeValues) {
      const attributeValues = props.attributeValues.map((av) =>
        AttributeValueEntity.create({
          value: av.value,
          displayOrder: av.displayOrder,
        }),
      );
      defaultAttributeValues = attributeValues;
    }

    const defaultProps: AttributeProps = {
      name: props.name,
      valueType: props.valueType,
      inputType: props.inputType,
      unit: props.unit,
      attributeValues: defaultAttributeValues,
    };

    const attribute = new AttributeEntity({ props: defaultProps, id });
    return Ok(attribute);
  }

  private static validateName(
    name: string,
  ): Result<
    void,
    | AttributeErrors.AttributeNameEmptyError
    | AttributeErrors.AttributeNameTooLongError
  > {
    if (Guard.isEmpty(name) || name.trim().length === 0) {
      return Err(new AttributeErrors.AttributeNameEmptyError());
    }

    if (!Guard.lengthIsBetween(name, 1, 255)) {
      return Err(new AttributeErrors.AttributeNameTooLongError());
    }

    return Ok(undefined);
  }

  private static validateValueType(
    valueType: string,
  ): Result<void, AttributeErrors.InvalidValueTypeError> {
    if (!Guard.isInArray(valueType, ValueTypes)) {
      return Err(new AttributeErrors.InvalidValueTypeError(valueType));
    }
    return Ok(undefined);
  }

  private static validateInputType(
    inputType: string,
  ): Result<void, AttributeErrors.InvalidInputTypeError> {
    if (!Guard.isInArray(inputType, InputTypes)) {
      return Err(new AttributeErrors.InvalidInputTypeError(inputType));
    }
    return Ok(undefined);
  }

  private static isEnumType(valueType: ValueType): boolean {
    return valueType === 'enum' || valueType === 'multiselect';
  }

  private static validateAttributeValues(
    valueType: ValueType,
    attributeValues: CreateAttributeValueProps[] | null,
  ): Result<
    void,
    | AttributeErrors.EnumAttributeWithoutValuesError
    | AttributeErrors.NonEnumAttributeWithValuesError
    | AttributeErrors.AttributeValueEmptyError
    | AttributeErrors.DuplicateAttributeValueError
    | AttributeErrors.DuplicateAttributeValueCaseInsensitiveError
    | AttributeErrors.NegativeDisplayOrderError
  > {
    const isEnum = this.isEnumType(valueType);

    // Enum/multiselect must have values
    if (isEnum && (!attributeValues || attributeValues.length === 0)) {
      const errorMessage =
        valueType === 'enum'
          ? 'Enum attributes must have at least one value'
          : 'Multiselect attributes must have at least one value';
      return Err(
        new AttributeErrors.EnumAttributeWithoutValuesError(errorMessage),
      );
    }

    // Non-enum types cannot have values
    if (!isEnum && attributeValues && attributeValues.length > 0) {
      const typeName = valueType.charAt(0).toUpperCase() + valueType.slice(1);
      const errorMessage = `${typeName} attributes cannot have predefined values`;
      return Err(
        new AttributeErrors.NonEnumAttributeWithValuesError(errorMessage),
      );
    }

    // Validate individual attribute values if they exist
    if (attributeValues && attributeValues.length > 0) {
      const valuesValidation =
        this.validateIndividualAttributeValues(attributeValues);
      if (valuesValidation.isErr()) {
        return valuesValidation;
      }
    }

    return Ok(undefined);
  }

  private static validateIndividualAttributeValues(
    attributeValues: CreateAttributeValueProps[],
  ): Result<
    void,
    | AttributeErrors.AttributeValueEmptyError
    | AttributeErrors.DuplicateAttributeValueError
    | AttributeErrors.DuplicateAttributeValueCaseInsensitiveError
    | AttributeErrors.NegativeDisplayOrderError
  > {
    const seenValues = new Map<string, string>(); // lowercase -> original

    for (const av of attributeValues) {
      // Check for empty value
      if (Guard.isEmpty(av.value) || av.value.trim().length === 0) {
        return Err(new AttributeErrors.AttributeValueEmptyError());
      }

      // Check for negative display order
      if (av.displayOrder < 0) {
        return Err(new AttributeErrors.NegativeDisplayOrderError());
      }

      // Check for exact duplicates
      const exactMatch = attributeValues.filter(
        (v) => v.value === av.value,
      ).length;
      if (exactMatch > 1) {
        return Err(new AttributeErrors.DuplicateAttributeValueError(av.value));
      }

      // Check for case-insensitive duplicates
      const lowerValue = av.value.toLowerCase();
      if (seenValues.has(lowerValue)) {
        const existingValue = seenValues.get(lowerValue)!;
        if (existingValue !== av.value) {
          return Err(
            new AttributeErrors.DuplicateAttributeValueCaseInsensitiveError(
              av.value,
              existingValue,
            ),
          );
        }
      }
      seenValues.set(lowerValue, av.value);
    }

    return Ok(undefined);
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
