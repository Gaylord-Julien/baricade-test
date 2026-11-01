import { Map as MaplibreMap, setWorkerUrl } from 'maplibre-gl'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import { type RefObject, useEffect, useState } from 'react'

import { initialMapCenter, initialMapZoom, mapStyleUrl } from '../constants/map'

setWorkerUrl(maplibreWorkerUrl)

export function useMapInstance(
  containerReference: RefObject<HTMLElement | null>,
): MaplibreMap | undefined {
  const [map, setMap] = useState<MaplibreMap>()

  useEffect(() => {
    const container = containerReference.current
    if (!container) {
      return
    }
    const createdMap = new MaplibreMap({
      container,
      style: mapStyleUrl,
      center: [initialMapCenter.longitude, initialMapCenter.latitude],
      zoom: initialMapZoom,
      attributionControl: false,
    })
    createdMap.on('load', () => {
      setMap(createdMap)
    })
    return () => {
      setMap(undefined)
      createdMap.remove()
    }
  }, [containerReference])

  return map
}
