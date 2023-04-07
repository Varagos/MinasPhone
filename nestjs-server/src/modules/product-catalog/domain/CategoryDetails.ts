/**
 * @desc Read model for Category
 */

export class CategoryDetails {
  public id: string;

  public slug: string;

  public name: string;

  public parentId: string;

  constructor(props: Partial<CategoryDetails>) {
    Object.assign(this, props);
  }
}
