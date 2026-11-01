import { Injectable } from '@nestjs/common';
import type { DoorToDoorReport } from './entities/door-to-door-report.entity.js';

@Injectable()
export class DoorToDoorReportsRepository {
  private readonly reports: DoorToDoorReport[] = [];

  findAll(): DoorToDoorReport[] {
    return [...this.reports];
  }

  save(report: DoorToDoorReport): DoorToDoorReport {
    this.reports.push(report);
    return report;
  }
}
