import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const INTEREST_POINT_STATUSES = [
  'favorable',
  'undecided',
  'unfavorable',
  'absent',
] as const;

export type InterestPointStatus = (typeof INTEREST_POINT_STATUSES)[number];

export const MINIMUM_INTEREST_POINT_WEIGHT = 1;
export const MAXIMUM_INTEREST_POINT_WEIGHT = 5;
export const DEFAULT_INTEREST_POINT_WEIGHT = 3;

export class InterestPoint {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ minimum: -180, maximum: 180, example: 1.0993 })
  longitude: number;

  @ApiProperty({ minimum: -90, maximum: 90, example: 49.4431 })
  latitude: number;

  @ApiProperty({
    enum: INTEREST_POINT_STATUSES,
    enumName: 'InterestPointStatus',
  })
  status: InterestPointStatus;

  @ApiProperty({
    type: 'integer',
    minimum: MINIMUM_INTEREST_POINT_WEIGHT,
    maximum: MAXIMUM_INTEREST_POINT_WEIGHT,
  })
  weight: number;

  @ApiPropertyOptional()
  label?: string;
}
