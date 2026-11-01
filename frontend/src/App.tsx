import Box from '@mui/material/Box'
import { useCallback } from 'react'

import { createDoorToDoorReport } from './api/doorToDoorReports'
import { MapActions } from './components/actions/MapActions'
import { DoorToDoorReportPanel } from './components/doorToDoor/DoorToDoorReportPanel'
import { NotificationSnackbar } from './components/feedback/NotificationSnackbar'
import {
  type InterestPointDetails,
  InterestPointDialog,
} from './components/interestPoint/InterestPointDialog'
import { MapView } from './components/map/MapView'
import { NavigationSidebar } from './components/navigation/NavigationSidebar'
import { useInterestPoints } from './hooks/useInterestPoints'
import { useMapInteractionMode } from './hooks/useMapInteractionMode'
import { useNotification } from './hooks/useNotification'
import type { NewDoorToDoorReport } from './types/doorToDoorReport'

export function App() {
  const { notification, notify, dismissNotification } = useNotification()
  const notifyLoadError = useCallback(() => {
    notify('Impossible de charger les points d’intérêt.', 'error')
  }, [notify])
  const { interestPoints, addInterestPoint } =
    useInterestPoints(notifyLoadError)
  const interaction = useMapInteractionMode()

  const submitInterestPoint = async (details: InterestPointDetails) => {
    if (!interaction.pendingPlacement) {
      return
    }
    try {
      await addInterestPoint({ ...interaction.pendingPlacement, ...details })
      notify('Point d’intérêt ajouté.', 'success')
      interaction.finishInterestPointPlacement()
    } catch {
      notify('L’ajout du point d’intérêt a échoué.', 'error')
    }
  }

  const submitReport = async (report: NewDoorToDoorReport) => {
    try {
      await createDoorToDoorReport(report)
      notify('Bilan envoyé, merci !', 'success')
      interaction.closeReportPanel()
    } catch {
      notify('L’envoi du bilan a échoué.', 'error')
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      <MapView
        interestPoints={interestPoints}
        reportLocation={interaction.reportLocation}
        onLocationPick={interaction.locationPickHandler}
      />
      <NavigationSidebar />
      <MapActions
        isPlacingInterestPoint={interaction.isPlacingInterestPoint}
        isReportPanelOpen={interaction.isReportPanelOpen}
        onNewInterestPointClick={interaction.toggleInterestPointPlacement}
        onNewDoorToDoorClick={interaction.openReportPanel}
      />
      <DoorToDoorReportPanel
        isOpen={interaction.isReportPanelOpen}
        location={interaction.reportLocation}
        onSubmit={submitReport}
        onClose={interaction.closeReportPanel}
      />
      {interaction.pendingPlacement && (
        <InterestPointDialog
          isOpen
          onSubmit={submitInterestPoint}
          onCancel={interaction.cancelPendingPlacement}
        />
      )}
      <NotificationSnackbar
        notification={notification}
        onClose={dismissNotification}
      />
    </Box>
  )
}
