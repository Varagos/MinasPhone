import { CreateAttributeValueProps } from '@modules/product-catalog/domain/attribute-value.entity';
import {
  InputType,
  ValueType,
} from '@modules/product-catalog/domain/attribute.entity';

export class UpdateAttributeCommand {
  public readonly id: string;

  public readonly name: string;
  public readonly valueType: ValueType;
  public readonly inputType: InputType;
  public readonly unit: string | null;
  public readonly attributeValues: CreateAttributeValueProps[] | null;

  constructor(props: Partial<UpdateAttributeCommand>) {
    Object.assign(this, props);
  }
}
