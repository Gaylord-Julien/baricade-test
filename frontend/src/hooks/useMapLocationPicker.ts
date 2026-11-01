import type { MapMouseEvent, Map as MaplibreMap } from 'maplibre-gl'
import { useEffect } from 'react'

import type { GeographicCoordinates } from '../types/geography'

export function useMapLocationPicker(
  map: MaplibreMap | undefined,
  onLocationPick: ((coordinates: GeographicCoordinates) => void) | undefined,
): void {
  useEffect(() => {
    if (!map || !onLocationPick) {
      return
    }
    const canvas = map.getCanvas()
    canvas.style.cursor = 'crosshair'

    const pickLocation = (event: MapMouseEvent) => {
      onLocationPick({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
      })
    }
    map.on('click', pickLocation)

    return () => {
      map.off('click', pickLocation)
      canvas.style.cursor = ''
    }
  }, [map, onLocationPick])
}
