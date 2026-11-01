import seedInterestPoints from './interest-points.seed.json' with { type: 'json' };
import {
  INTEREST_POINT_STATUSES,
  type InterestPoint,
  type InterestPointStatus,
} from '../entities/interest-point.entity.js';

function isInterestPointStatus(status: string): status is InterestPointStatus {
  return (INTEREST_POINT_STATUSES as readonly string[]).includes(status);
}

export function loadInterestPointSeed(): InterestPoint[] {
  return seedInterestPoints.map((interestPoint) => {
    if (!isInterestPointStatus(interestPoint.status)) {
      throw new Error(`Unknown interest point status: ${interestPoint.status}`);
    }
    return { ...interestPoint, status: interestPoint.status };
  });
}
