import { Injectable } from '@nestjs/common';
import type { InterestPoint } from './entities/interest-point.entity.js';
import { loadInterestPointSeed } from './seed/interest-points-seed.js';

@Injectable()
export class InterestPointsRepository {
  private readonly interestPoints: InterestPoint[] = loadInterestPointSeed();

  findAll(): InterestPoint[] {
    return [...this.interestPoints];
  }

  save(interestPoint: InterestPoint): InterestPoint {
    this.interestPoints.push(interestPoint);
    return interestPoint;
  }
}
