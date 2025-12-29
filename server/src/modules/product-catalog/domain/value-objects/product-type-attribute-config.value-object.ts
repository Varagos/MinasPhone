import { ValueObject } from '@libs/ddd';
import { AggregateID } from '@libs/ddd/index';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ProductTypeAttributeConfigProps {
  attributeId: AggregateID;
  isRequired: boolean;
  isFilterable: boolean;
  isSearchable: boolean;
  displayOrder: number | null;
}

export class ProductTypeAttributeConfig extends ValueObject<ProductTypeAttributeConfigProps> {
  get attributeId(): AggregateID {
    return this.props.attributeId;
  }

  get isRequired(): boolean {
    return this.props.isRequired;
  }

  get isFilterable(): boolean {
    return this.props.isFilterable;
  }

  get isSearchable(): boolean {
    return this.props.isSearchable;
  }

  get displayOrder(): number | null {
    return this.props.displayOrder;
  }

  /**
   * Creates a new ProductTypeAttributeConfig value object
   * @param attributeId - The ID of the attribute
   * @param isRequired - Whether the attribute is required
   * @param isFilterable - Whether the attribute can be used for filtering
   * @param isSearchable - Whether the attribute can be searched
   * @param displayOrder - The order in which the attribute should be displayed (null for no specific order)
   */
  static create(
    props: ProductTypeAttributeConfigProps,
  ): ProductTypeAttributeConfig {
    try {
      return new ProductTypeAttributeConfig(props);
    } catch (e: any) {
      throw new ArgumentInvalidException(
        e.message ||
          'Failed to validate product type attribute config value object',
      );
    }
  }

  protected validate(props: ProductTypeAttributeConfigProps): void {
    const {
      attributeId,
      isRequired,
      isFilterable,
      isSearchable,
      displayOrder,
    } = props;

    if (!attributeId || typeof attributeId !== 'string') {
      throw new ArgumentInvalidException('Attribute ID must be a valid string');
    }

    if (typeof isRequired !== 'boolean') {
      throw new ArgumentInvalidException('isRequired must be a boolean');
    }

    if (typeof isFilterable !== 'boolean') {
      throw new ArgumentInvalidException('isFilterable must be a boolean');
    }

    if (typeof isSearchable !== 'boolean') {
      throw new ArgumentInvalidException('isSearchable must be a boolean');
    }

    if (
      displayOrder !== null &&
      (typeof displayOrder !== 'number' || displayOrder < 0)
    ) {
      throw new ArgumentInvalidException(
        'displayOrder must be null or a non-negative number',
      );
    }
  }
}
