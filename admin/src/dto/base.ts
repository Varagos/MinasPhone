import { RaRecord } from 'react-admin';

export interface ResponseBase extends RaRecord {
  // readonly id: string;
  //   @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly createdAt: string;
  //   @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly updatedAt: string;
}
