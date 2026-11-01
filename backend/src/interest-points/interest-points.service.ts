import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { CreateInterestPointDto } from './dto/create-interest-point.dto.js';
import {
  DEFAULT_INTEREST_POINT_WEIGHT,
  type InterestPoint,
} from './entities/interest-point.entity.js';
import { InterestPointsRepository } from './interest-points.repository.js';

@Injectable()
export class InterestPointsService {
  constructor(
    private readonly interestPointsRepository: InterestPointsRepository,
  ) {}

  findAll(): InterestPoint[] {
    return this.interestPointsRepository.findAll();
  }

  create(interestPointToCreate: CreateInterestPointDto): InterestPoint {
    const { longitude, latitude, status, label } = interestPointToCreate;
    return this.interestPointsRepository.save({
      id: randomUUID(),
      longitude,
      latitude,
      status,
      weight: DEFAULT_INTEREST_POINT_WEIGHT,
      ...(label !== undefined && { label }),
    });
  }
}
