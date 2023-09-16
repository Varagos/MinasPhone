import {
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsObject,
  IsIn,
  IsEmail,
  Validate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomSortParam implements ValidatorConstraintInterface {
  validate(value: [string, string], args: ValidationArguments) {
    // the incoming string is smthng  like ['title', 'ASC']
    try {
      if (!Array.isArray(value) || value.length !== 2) {
        return false;
      }
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
  validate(value: Record<string, string>, args: ValidationArguments) {
    const validFields = args.constraints as string[];
    try {
      for (const key of Object.keys(value)) {
        if (!validFields.includes(key)) {
          return false; // invalid key found
        }
        if (typeof value[key] !== 'number' && typeof value[key] !== 'string') {
          return false; // invalid value type found
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
    )} with either string or number values`;
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

export class FindOrdersQueryDto {
  @ApiProperty({
    description: 'Order by field and order',
    example: '["email", "ASC"]',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomSortParam, [
    'email',
    'phoneNumber',
    'firstName',
    'lastName',
    'status',
    'createdAt',
    'updatedAt',
    'id',
  ])
  sort?: [string, 'ASC' | 'DESC'];

  @ApiProperty({
    description: 'Range of results to return',
    example: '[0, 10]',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomRangeParam)
  range?: [number, number];

  @ApiProperty({
    description: 'Filter results',
    example: '{"email": "john@doe.com"}',
  })
  @IsOptional()
  @TransformJSON()
  @Validate(CustomFilterParam, [
    'email',
    'phoneNumber',
    'firstName',
    'lastName',
    'status',
  ])
  filter?: Record<string, string | number>;
}
