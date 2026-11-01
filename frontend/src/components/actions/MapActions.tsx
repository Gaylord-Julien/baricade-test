import DoorFrontOutlined from '@mui/icons-material/DoorFrontOutlined'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import {
  compactFloatingMargin,
  floatingMargin,
  navigationSidebarWidth,
  reportPanelWidth,
} from '../../constants/layout'
import { useIsCompactLayout } from '../../hooks/useIsCompactLayout'
import { PlacementHint } from './PlacementHint'

interface MapActionsProperties {
  isPlacingInterestPoint: boolean
  isReportPanelOpen: boolean
  onNewInterestPointClick: () => void
  onNewDoorToDoorClick: () => void
}

function getHorizontalOffsets(
  isCompactLayout: boolean,
  isReportPanelOpen: boolean,
) {
  if (isCompactLayout) {
    return { left: compactFloatingMargin, right: compactFloatingMargin }
  }
  return {
    left: navigationSidebarWidth + floatingMargin * 2,
    right: isReportPanelOpen
      ? reportPanelWidth + floatingMargin * 2
      : floatingMargin,
  }
}

export function MapActions({
  isPlacingInterestPoint,
  isReportPanelOpen,
  onNewInterestPointClick,
  onNewDoorToDoorClick,
}: MapActionsProperties) {
  const isCompactLayout = useIsCompactLayout()

  if (isCompactLayout && isReportPanelOpen) {
    return
  }

  const buttonSize = isCompactLayout ? 'medium' : 'large'

  return (
    <Stack
      sx={{
        position: 'absolute',
        bottom: isCompactLayout ? floatingMargin : floatingMargin * 1.5,
        ...getHorizontalOffsets(isCompactLayout, isReportPanelOpen),
        alignItems: 'center',
        gap: 1.5,
        pointerEvents: 'none',
        transition: (theme) => theme.transitions.create('right'),
      }}
    >
      {isPlacingInterestPoint && (
        <PlacementHint onCancel={onNewInterestPointClick} />
      )}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
          '& > *': { pointerEvents: 'auto' },
        }}
      >
        <Button
          size={buttonSize}
          onClick={onNewInterestPointClick}
          endIcon={<PlaceOutlined />}
          aria-pressed={isPlacingInterestPoint}
          sx={{
            px: 2,
            color: isPlacingInterestPoint ? 'primary.main' : 'text.primary',
            bgcolor: isPlacingInterestPoint ? 'primary.50' : 'common.white',
            boxShadow: 3,
            outline: isPlacingInterestPoint ? 2 : 0,
            outlineColor: 'primary.main',
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          {isCompactLayout ? 'Point d’intérêt' : 'Nouveau point d’intérêt'}
        </Button>
        <Button
          size={buttonSize}
          variant="contained"
          onClick={onNewDoorToDoorClick}
          endIcon={<DoorFrontOutlined />}
          sx={{ px: 2, boxShadow: 3 }}
        >
          {isCompactLayout ? 'Porte à porte' : 'Nouveau porte à porte'}
        </Button>
      </Box>
    </Stack>
  )
}
