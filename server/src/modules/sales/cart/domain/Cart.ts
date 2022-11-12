import { Result } from '../../../../shared/core/Result';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { CartItem } from './item/CartItem';
import { ProductId } from './item/ProductId';

interface CartProps {
  items: CartItem[];
}

export class Cart extends AggregateRoot<CartProps> {
  private constructor(props: CartProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get categoryId(): any {
    return this._id;
  }

  get items(): CartItem[] {
    return this.props.items;
  }

  get hasItems(): boolean {
    return this.props.items.length > 0;
  }

  public static create(props: CartProps, id?: UniqueEntityID): Result<Cart> {
    // TODO validations

    const isNewCart = !!id === false;
    const defaultProps = {
      items: props.items,
    };
    const cart = new Cart(defaultProps, id);

    if (isNewCart) {
      // domain event
    }
    return Result.ok<Cart>(cart);
  }

  public add(toAdd: CartItem): Result<void> {
    const existingItem = this.props.items.find(
      (item) => item.productId === toAdd.productId,
    );
    if (existingItem) {
      existingItem.quantity.add(toAdd.quantity);
    } else {
      this.props.items.push(toAdd);
    }
    return Result.ok<void>();
  }

  public remove(productId: ProductId): void {
    this.props.items = this.props.items.filter(
      (item) => item.productId !== productId,
    );
  }

  public empty(): void {
    this.props.items = [];
  }
}
