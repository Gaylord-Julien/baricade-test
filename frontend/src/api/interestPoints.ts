import type { InterestPoint, NewInterestPoint } from '../types/interestPoint'
import { getJson, postJson } from './httpClient'

const interestPointsPath = '/api/interest-points'

export function fetchInterestPoints(
  signal?: AbortSignal,
): Promise<InterestPoint[]> {
  return getJson<InterestPoint[]>(interestPointsPath, signal)
}

export function createInterestPoint(
  interestPoint: NewInterestPoint,
): Promise<InterestPoint> {
  return postJson<InterestPoint>(interestPointsPath, interestPoint)
}
