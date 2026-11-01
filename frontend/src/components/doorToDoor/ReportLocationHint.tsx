import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { GeographicCoordinates } from '../../types/geography'

interface ReportLocationHintProperties {
  location: GeographicCoordinates | undefined
}

function formatLocation(location: GeographicCoordinates): string {
  return `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
}

export function ReportLocationHint({ location }: ReportLocationHintProperties) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', gap: 0.75, color: 'text.secondary' }}
    >
      <PlaceOutlined
        fontSize="small"
        color={location ? 'primary' : 'inherit'}
      />
      <Typography sx={{ fontSize: 12 }}>
        {location
          ? `Lieu : ${formatLocation(location)}`
          : 'Cliquez sur la carte pour indiquer le lieu (facultatif)'}
      </Typography>
    </Stack>
  )
}
