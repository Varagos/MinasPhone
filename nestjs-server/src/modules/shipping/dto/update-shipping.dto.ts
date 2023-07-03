import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingDto } from './create-shipping.dto';

export class UpdateShippingDto extends PartialType(CreateShippingDto) {}
