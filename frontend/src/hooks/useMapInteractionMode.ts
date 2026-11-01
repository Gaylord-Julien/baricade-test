import { useCallback, useState } from 'react'

import type { GeographicCoordinates } from '../types/geography'

export function useMapInteractionMode() {
  const [isPlacingInterestPoint, setIsPlacingInterestPoint] = useState(false)
  const [pendingPlacement, setPendingPlacement] =
    useState<GeographicCoordinates>()
  const [isReportPanelOpen, setIsReportPanelOpen] = useState(false)
  const [reportLocation, setReportLocation] = useState<GeographicCoordinates>()

  const toggleInterestPointPlacement = useCallback(() => {
    setIsPlacingInterestPoint((wasPlacing) => !wasPlacing)
  }, [])

  const finishInterestPointPlacement = useCallback(() => {
    setPendingPlacement(undefined)
    setIsPlacingInterestPoint(false)
  }, [])

  const cancelPendingPlacement = useCallback(() => {
    setPendingPlacement(undefined)
  }, [])

  const openReportPanel = useCallback(() => {
    setIsPlacingInterestPoint(false)
    setIsReportPanelOpen(true)
  }, [])

  const closeReportPanel = useCallback(() => {
    setIsReportPanelOpen(false)
    setReportLocation(undefined)
  }, [])

  const placementHandler = isPlacingInterestPoint
    ? setPendingPlacement
    : undefined
  const reportHandler = isReportPanelOpen ? setReportLocation : undefined
  const locationPickHandler = placementHandler ?? reportHandler

  return {
    isPlacingInterestPoint,
    pendingPlacement,
    isReportPanelOpen,
    reportLocation,
    locationPickHandler,
    toggleInterestPointPlacement,
    finishInterestPointPlacement,
    cancelPendingPlacement,
    openReportPanel,
    closeReportPanel,
  }
}
