import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import {
  DOOR_TO_DOOR_ROLES,
  type DoorToDoorRole,
} from '../entities/door-to-door-report.entity.js';

export const MAXIMUM_COMMENT_LENGTH = 500;
export const MAXIMUM_GROUP_NAME_LENGTH = 100;

export class CreateDoorToDoorReportDto {
  @ApiProperty({ enum: DOOR_TO_DOOR_ROLES, enumName: 'DoorToDoorRole' })
  @IsIn(DOOR_TO_DOOR_ROLES)
  role: DoorToDoorRole;

  @ApiPropertyOptional({
    maxLength: MAXIMUM_GROUP_NAME_LENGTH,
    description: 'Required when role is "group"',
  })
  @ValidateIf(
    (report: CreateDoorToDoorReportDto) =>
      report.role === 'group' || report.groupName !== undefined,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAXIMUM_GROUP_NAME_LENGTH)
  groupName?: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  knockedDoorCount: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  openedDoorCount: number;

  @ApiPropertyOptional({ maxLength: MAXIMUM_COMMENT_LENGTH })
  @IsOptional()
  @IsString()
  @MaxLength(MAXIMUM_COMMENT_LENGTH)
  comment?: string;

  @ApiPropertyOptional({ minimum: -180, maximum: 180 })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsLongitude()
  longitude?: number;

  @ApiPropertyOptional({ minimum: -90, maximum: 90 })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsLatitude()
  latitude?: number;
}
