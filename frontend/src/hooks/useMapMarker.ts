import { type Map as MaplibreMap, Marker } from 'maplibre-gl'
import { useEffect } from 'react'

import type { GeographicCoordinates } from '../types/geography'

export function useMapMarker(
  map: MaplibreMap | undefined,
  location: GeographicCoordinates | undefined,
  color: string,
): void {
  useEffect(() => {
    if (!map || !location) {
      return
    }
    const marker = new Marker({ color })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map)
    return () => {
      marker.remove()
    }
  }, [map, location, color])
}
