import { Result } from '../../../../../shared/core/Result.js';
import { Entity } from '../../../../../shared/domain/Entity.js';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID.js';

export class ProductId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<ProductId> {
    return Result.ok<ProductId>(new ProductId(id));
  }
}
