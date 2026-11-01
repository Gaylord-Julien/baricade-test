import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DoorToDoorReportsRepository } from './door-to-door-reports.repository.js';
import type { CreateDoorToDoorReportDto } from './dto/create-door-to-door-report.dto.js';
import type { DoorToDoorReport } from './entities/door-to-door-report.entity.js';

@Injectable()
export class DoorToDoorReportsService {
  constructor(
    private readonly doorToDoorReportsRepository: DoorToDoorReportsRepository,
  ) {}

  findAll(): DoorToDoorReport[] {
    return this.doorToDoorReportsRepository.findAll();
  }

  create(reportToCreate: CreateDoorToDoorReportDto): DoorToDoorReport {
    const {
      role,
      groupName,
      knockedDoorCount,
      openedDoorCount,
      comment,
      longitude,
      latitude,
    } = reportToCreate;
    return this.doorToDoorReportsRepository.save({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      role,
      ...(groupName !== undefined && { groupName }),
      knockedDoorCount,
      openedDoorCount,
      ...(comment !== undefined && { comment }),
      ...(longitude !== undefined && { longitude }),
      ...(latitude !== undefined && { latitude }),
    });
  }
}
