import { Result } from '../../../../shared/core/Result.js';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot.js';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { CartItem } from './item/CartItem.js';
import { ProductId } from './item/ProductId.js';

interface CartProps {
  lineItems: CartItem[];
}

export class Cart extends AggregateRoot<CartProps> {
  private constructor(props: CartProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get categoryId(): any {
    return this._id;
  }

  get lineItems(): CartItem[] {
    return this.props.lineItems;
  }

  get hasItems(): boolean {
    return this.props.lineItems.length > 0;
  }

  public static create(props: CartProps, id?: UniqueEntityID): Result<Cart> {
    // TODO validations

    const isNewCart = !!id === false;
    const defaultProps = {
      lineItems: props.lineItems,
    };
    const cart = new Cart(defaultProps, id);

    if (isNewCart) {
      // domain event
    }
    return Result.ok<Cart>(cart);
  }

  public add(toAdd: CartItem): Result<void> {
    const existingItem = this.props.lineItems.find(
      (item) => item.productId === toAdd.productId,
    );
    if (existingItem) {
      existingItem.quantity.add(toAdd.quantity);
    } else {
      this.props.lineItems.push(toAdd);
    }
    return Result.ok<void>();
  }

  public remove(productId: ProductId): void {
    this.props.lineItems = this.props.lineItems.filter(
      (item) => item.productId !== productId,
    );
  }

  public empty(): void {
    this.props.lineItems = [];
  }
}
