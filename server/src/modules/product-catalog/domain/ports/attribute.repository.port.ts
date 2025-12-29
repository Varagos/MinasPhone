import { RepositoryPort } from '@libs/ddd';
import { AttributeEntity } from '../attribute.entity';

export interface AttributeRepositoryPort
  extends RepositoryPort<AttributeEntity> {
  findManyByIds(ids: string[]): Promise<AttributeEntity[]>;
}
