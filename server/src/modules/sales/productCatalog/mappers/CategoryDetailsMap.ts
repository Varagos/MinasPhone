import { CategoryDetails } from '../domain/CategoryDetails.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { CategoryDTO } from '../dtos/categoryDTO.js';
import { Category as PersistenceCategory } from '../../../../shared/infra/database/typeorm/models/index.js';

export class CategoryDetailsMap implements Mapper<CategoryDetails> {
  public static toDomain(raw: PersistenceCategory): CategoryDetails {
    const categoryOrError = CategoryDetails.create({
      id: raw.id,
      slug: raw.slug,
      name: raw.name,
    });

    categoryOrError.isFailure && console.log(categoryOrError.getErrorValue());

    return categoryOrError.getValue();
  }

  public static toDTO(categoryDetails: CategoryDetails): CategoryDTO {
    return {
      id: categoryDetails.id,
      slug: categoryDetails.slug,
      name: categoryDetails.name,
    };
  }
}
