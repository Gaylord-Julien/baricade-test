import type { FeatureCollection, Point } from 'geojson'
import type {
  CircleLayerSpecification,
  ExpressionSpecification,
} from 'maplibre-gl'

import { interestPointStatusColors } from '../constants/interestPointStatuses'
import type { InterestPoint } from '../types/interestPoint'

export const interestPointSourceId = 'interest-points'
export const interestPointLayerId = 'interest-points-circles'

type InterestPointProperties = Pick<
  InterestPoint,
  'status' | 'weight' | 'label'
>

export function toInterestPointCollection(
  interestPoints: readonly InterestPoint[],
): FeatureCollection<Point, InterestPointProperties> {
  return {
    type: 'FeatureCollection',
    features: interestPoints.map((interestPoint) => ({
      type: 'Feature',
      id: interestPoint.id,
      geometry: {
        type: 'Point',
        coordinates: [interestPoint.longitude, interestPoint.latitude],
      },
      properties: {
        status: interestPoint.status,
        weight: interestPoint.weight,
        ...(interestPoint.label !== undefined && {
          label: interestPoint.label,
        }),
      },
    })),
  }
}

const weight: ExpressionSpecification = ['coalesce', ['get', 'weight'], 1]

export const interestPointLayer: CircleLayerSpecification = {
  id: interestPointLayerId,
  type: 'circle',
  source: interestPointSourceId,
  paint: {
    'circle-color': [
      'match',
      ['get', 'status'],
      'favorable',
      interestPointStatusColors.favorable,
      'undecided',
      interestPointStatusColors.undecided,
      'unfavorable',
      interestPointStatusColors.unfavorable,
      interestPointStatusColors.absent,
    ],
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      12,
      ['interpolate', ['linear'], weight, 1, 1.5, 5, 4],
      16,
      ['interpolate', ['linear'], weight, 1, 3.5, 5, 10],
      19,
      ['interpolate', ['linear'], weight, 1, 8, 5, 22],
    ],
    'circle-opacity': 0.85,
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': 0.6,
    'circle-stroke-opacity': 0.9,
  },
}
