import 'maplibre-gl/dist/maplibre-gl.css'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { useRef } from 'react'

import { useInterestPointLayer } from '../../hooks/useInterestPointLayer'
import { useInterestPointPopup } from '../../hooks/useInterestPointPopup'
import { useMapInstance } from '../../hooks/useMapInstance'
import { useMapLocationPicker } from '../../hooks/useMapLocationPicker'
import { useMapMarker } from '../../hooks/useMapMarker'
import type { GeographicCoordinates } from '../../types/geography'
import type { InterestPoint } from '../../types/interestPoint'

interface MapViewProperties {
  interestPoints: readonly InterestPoint[]
  reportLocation: GeographicCoordinates | undefined
  onLocationPick: ((coordinates: GeographicCoordinates) => void) | undefined
}

export function MapView({
  interestPoints,
  reportLocation,
  onLocationPick,
}: MapViewProperties) {
  const theme = useTheme()
  const containerReference = useRef<HTMLDivElement>(null)
  const map = useMapInstance(containerReference)

  useInterestPointLayer(map, interestPoints)
  useInterestPointPopup(map, onLocationPick === undefined)
  useMapLocationPicker(map, onLocationPick)
  useMapMarker(map, reportLocation, theme.palette.primary.main)

  return (
    <Box
      ref={containerReference}
      sx={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
