import {
  TransformJSON,
  CustomSortParam,
  CustomRangeParam,
  CustomFilterParam,
} from '@libs/api/query-params.request';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Validate } from 'class-validator';

export class FindAllProductSlugsRequestDto {}

export class FindAllProductSlugsQueryDto {}
