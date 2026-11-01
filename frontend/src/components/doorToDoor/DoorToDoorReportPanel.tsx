import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'

import {
  compactFloatingMargin,
  compactReportPanelHeight,
  floatingMargin,
  reportPanelWidth,
} from '../../constants/layout'
import { useIsCompactLayout } from '../../hooks/useIsCompactLayout'
import type { NewDoorToDoorReport } from '../../types/doorToDoorReport'
import type { GeographicCoordinates } from '../../types/geography'
import { DoorToDoorReportForm } from './DoorToDoorReportForm'

interface DoorToDoorReportPanelProperties {
  isOpen: boolean
  location: GeographicCoordinates | undefined
  onSubmit: (report: NewDoorToDoorReport) => Promise<void>
  onClose: () => void
}

const sidePanelPosition = {
  top: floatingMargin,
  right: floatingMargin,
  bottom: floatingMargin,
  width: reportPanelWidth,
}

const bottomSheetPosition = {
  left: compactFloatingMargin,
  right: compactFloatingMargin,
  bottom: compactFloatingMargin,
  height: compactReportPanelHeight,
}

export function DoorToDoorReportPanel({
  isOpen,
  location,
  onSubmit,
  onClose,
}: DoorToDoorReportPanelProperties) {
  const isCompactLayout = useIsCompactLayout()

  return (
    <Slide
      direction={isCompactLayout ? 'up' : 'left'}
      in={isOpen}
      mountOnEnter
      unmountOnExit
    >
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          ...(isCompactLayout ? bottomSheetPosition : sidePanelPosition),
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <DoorToDoorReportForm
          location={location}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </Paper>
    </Slide>
  )
}
