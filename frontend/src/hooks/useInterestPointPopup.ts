import {
  type MapLayerMouseEvent,
  type Map as MaplibreMap,
  Popup,
} from 'maplibre-gl'
import { useEffect } from 'react'

import { interestPointLayerId } from '../map/interestPointLayer'
import { createInterestPointPopupContent } from '../map/interestPointPopupContent'

export function useInterestPointPopup(
  map: MaplibreMap | undefined,
  isEnabled: boolean,
): void {
  useEffect(() => {
    if (!map || !isEnabled) {
      return
    }
    const popup = new Popup({ offset: 10, maxWidth: '240px' })
    const canvas = map.getCanvas()

    const showPopup = (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0]
      if (!feature) {
        return
      }
      popup
        .setLngLat(event.lngLat)
        .setDOMContent(createInterestPointPopupContent(feature.properties))
        .addTo(map)
    }
    const showPointer = () => {
      canvas.style.cursor = 'pointer'
    }
    const resetCursor = () => {
      canvas.style.cursor = ''
    }

    map.on('click', interestPointLayerId, showPopup)
    map.on('mouseenter', interestPointLayerId, showPointer)
    map.on('mouseleave', interestPointLayerId, resetCursor)

    return () => {
      map.off('click', interestPointLayerId, showPopup)
      map.off('mouseenter', interestPointLayerId, showPointer)
      map.off('mouseleave', interestPointLayerId, resetCursor)
      popup.remove()
      resetCursor()
    }
  }, [map, isEnabled])
}
