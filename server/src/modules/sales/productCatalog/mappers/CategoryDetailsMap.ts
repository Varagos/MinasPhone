import { CategoryDetails } from '../domain/CategoryDetails.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { CategoryDTO } from '../dtos/categoryDTO.js';

export class CategoryDetailsMap implements Mapper<CategoryDetails> {
  public static toDomain(raw: any): CategoryDetails {
    const categoryOrError = CategoryDetails.create({
      id: raw.id,
      slug: raw.slug,
      name: raw.name,
      parent_id: raw.parent_id,
    });

    categoryOrError.isFailure && console.log(categoryOrError.getErrorValue());

    return categoryOrError.getValue();
  }

  public static toDTO(categoryDetails: CategoryDetails): CategoryDTO {
    return {
      id: categoryDetails.id,
      slug: categoryDetails.slug,
      name: categoryDetails.name,
      parent_id: categoryDetails.parentId,
    };
  }
}
