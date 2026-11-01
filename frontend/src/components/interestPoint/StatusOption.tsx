import Box from '@mui/material/Box'

import {
  interestPointStatusColors,
  interestPointStatusLabels,
} from '../../constants/interestPointStatuses'
import type { InterestPointStatus } from '../../types/interestPoint'

interface StatusOptionProperties {
  status: InterestPointStatus
}

export function StatusOption({ status }: StatusOptionProperties) {
  return (
    <Box
      component="span"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
    >
      <Box
        component="span"
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: interestPointStatusColors[status],
        }}
      />
      {interestPointStatusLabels[status]}
    </Box>
  )
}
