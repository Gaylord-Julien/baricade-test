import { Module } from '@nestjs/common';
import { DoorToDoorReportsController } from './door-to-door-reports.controller.js';
import { DoorToDoorReportsRepository } from './door-to-door-reports.repository.js';
import { DoorToDoorReportsService } from './door-to-door-reports.service.js';

@Module({
  controllers: [DoorToDoorReportsController],
  providers: [DoorToDoorReportsService, DoorToDoorReportsRepository],
})
export class DoorToDoorReportsModule {}
