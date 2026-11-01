import type { GeoJSONSource, Map as MaplibreMap } from 'maplibre-gl'
import { useEffect } from 'react'

import {
  interestPointLayer,
  interestPointSourceId,
  toInterestPointCollection,
} from '../map/interestPointLayer'
import type { InterestPoint } from '../types/interestPoint'

export function useInterestPointLayer(
  map: MaplibreMap | undefined,
  interestPoints: readonly InterestPoint[],
): void {
  useEffect(() => {
    if (!map) {
      return
    }
    const collection = toInterestPointCollection(interestPoints)
    const existingSource = map.getSource<GeoJSONSource>(interestPointSourceId)
    if (existingSource) {
      void existingSource.setData(collection)
      return
    }
    map.addSource(interestPointSourceId, { type: 'geojson', data: collection })
    map.addLayer(interestPointLayer)
  }, [map, interestPoints])
}
