import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const DOOR_TO_DOOR_ROLES = ['individual', 'group'] as const;

export type DoorToDoorRole = (typeof DOOR_TO_DOOR_ROLES)[number];

export class DoorToDoorReport {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'date-time' })
  createdAt: string;

  @ApiProperty({ enum: DOOR_TO_DOOR_ROLES, enumName: 'DoorToDoorRole' })
  role: DoorToDoorRole;

  @ApiPropertyOptional()
  groupName?: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  knockedDoorCount: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  openedDoorCount: number;

  @ApiPropertyOptional({ maxLength: 500 })
  comment?: string;

  @ApiPropertyOptional({ minimum: -180, maximum: 180 })
  longitude?: number;

  @ApiPropertyOptional({ minimum: -90, maximum: 90 })
  latitude?: number;
}
