import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  INTEREST_POINT_STATUSES,
  type InterestPointStatus,
} from '../entities/interest-point.entity.js';

export const MAXIMUM_LABEL_LENGTH = 200;

export class CreateInterestPointDto {
  @ApiProperty({ minimum: -180, maximum: 180, example: 1.0993 })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ minimum: -90, maximum: 90, example: 49.4431 })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    enum: INTEREST_POINT_STATUSES,
    enumName: 'InterestPointStatus',
  })
  @IsIn(INTEREST_POINT_STATUSES)
  status: InterestPointStatus;

  @ApiPropertyOptional({ maxLength: MAXIMUM_LABEL_LENGTH })
  @IsOptional()
  @IsString()
  @MaxLength(MAXIMUM_LABEL_LENGTH)
  label?: string;
}
