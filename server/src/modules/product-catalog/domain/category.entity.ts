import { AggregateID, AggregateRoot } from '@libs/ddd/index';
import { randomUUID } from 'crypto';

interface CategoryProps {
  slug: string;
  name: string;
  parentId: string | null;
  sortOrder?: number;
}
interface CreateCategoryProps {
  slug: string;
  name: string;
  parentId: string | null;
  sortOrder?: number;
}

export class CategoryEntity extends AggregateRoot<CategoryProps> {
  protected readonly _id: AggregateID;

  get categoryId(): any {
    return this._id;
  }

  get slug(): string {
    return this.props.slug;
  }
  get name(): string {
    return this.props.name;
  }

  get sortOrder(): number {
    return this.props.sortOrder ?? 0;
  }

  public static create(props: CreateCategoryProps): CategoryEntity {
    // TODO validations
    const id = randomUUID();

    const defaultProps = {
      slug: props.slug,
      name: props.name,
      parentId: props.parentId,
      sortOrder: props.sortOrder ?? 0,
    };
    const category = new CategoryEntity({ props: defaultProps, id });

    return category;
  }

  delete(): void {
    // this.addEvent(
    // new CategoryDeletedDomainEvent({
    //   aggregateId: this.id,
    // }),
    // );
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }

  public updateSlug(slug: string): void {
    this.props.slug = slug;
  }

  public updateName(name: string): void {
    this.props.name = name;
  }

  public updateParentId(parentId: string): void {
    this.props.parentId = parentId;
  }

  public updateSortOrder(sortOrder: number): void {
    this.props.sortOrder = sortOrder;
  }
}
