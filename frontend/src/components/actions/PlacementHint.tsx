import TouchAppOutlined from '@mui/icons-material/TouchAppOutlined'
import Chip from '@mui/material/Chip'

interface PlacementHintProperties {
  onCancel: () => void
}

export function PlacementHint({ onCancel }: PlacementHintProperties) {
  return (
    <Chip
      icon={<TouchAppOutlined />}
      label="Cliquez sur la carte pour placer le point"
      onDelete={onCancel}
      size="small"
      sx={{ bgcolor: 'common.white', boxShadow: 2, pointerEvents: 'auto' }}
    />
  )
}
