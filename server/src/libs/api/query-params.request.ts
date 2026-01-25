import { Transform } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomSortParam implements ValidatorConstraintInterface {
  validate(value: [string, string], args: ValidationArguments) {
    // the incoming string is smthng  like ['title', 'ASC']
    try {
      if (!Array.isArray(value) || value.length !== 2) {
        return false;
      }
      //   console.log('RECEIVED VALUE', value);
      const validFields = args.constraints as string[];
      // Try parsing it as JSON and then destructuring it into field and order
      const [field, order] = value; // JSON.parse(text);
      return validFields.includes(field) && ['ASC', 'DESC'].includes(order);
    } catch (e) {
      // Failed to parse or destructure, so return false
      console.log(e);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Allowed sort params are [${args.constraints.join(
      ', ',
    )}] and order can be ASC or DESC`;
  }
}

@ValidatorConstraint({ name: 'customRange', async: false })
export class CustomRangeParam implements ValidatorConstraintInterface {
  validate(value: [number, number], args: ValidationArguments) {
    try {
      if (!Array.isArray(value) || value.length !== 2) {
        return false;
      }
      // Parse it as JSON and then destructure it into start and end
      const [start, end] = value;
      return (
        typeof start === 'number' &&
        typeof end === 'number' &&
        start <= end &&
        start >= 0
      );
    } catch (e) {
      // Failed to parse or destructure, so return false
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Range should be a tuple of two numbers [start, end], where start <= end and start >= 0';
  }
}

@ValidatorConstraint({ name: 'customFilter', async: false })
export class CustomFilterParam implements ValidatorConstraintInterface {
  validate(
    value: Record<string, string | number | Record<string, string[]>>,
    args: ValidationArguments,
  ) {
    const validFields = args.constraints as string[];
    try {
      for (const key of Object.keys(value)) {
        if (!validFields.includes(key)) {
          return false; // invalid key found
        }
        const fieldValue = value[key];
        // Allow string, number, or object (for attributeFilters)
        if (
          typeof fieldValue !== 'number' &&
          typeof fieldValue !== 'string' &&
          typeof fieldValue !== 'object'
        ) {
          return false; // invalid value type found
        }
        // Validate attributeFilters structure if present
        if (key === 'attributeFilters' && typeof fieldValue === 'object') {
          for (const attrValue of Object.values(
            fieldValue as Record<string, string[]>,
          )) {
            if (!Array.isArray(attrValue)) {
              return false; // must be an array
            }
            if (!attrValue.every((v) => typeof v === 'string')) {
              return false; // all values must be strings (UUIDs)
            }
          }
        }
      }
      return true;
    } catch (e) {
      // Failed to parse as JSON
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Allowed filter keys are ${args.constraints.join(
      ', ',
    )} with either string, number, or object values, received: ${Object.keys(
      args.value,
    ).join(', ')}`;
  }
}

export function TransformJSON(): PropertyDecorator {
  return Transform(({ value, key }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        throw new BadRequestException(
          `Invalid JSON format for ${key} parameter`,
        );
      }
    }
    return value; // already transformed
  });
}
