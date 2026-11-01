import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const campaigns = [
  { id: 'campaign-1', name: 'Campagne 1' },
  { id: 'campaign-2', name: 'Campagne 2' },
]

const whiteOutline = 'rgba(255, 255, 255, 0.7)'

export function CampaignSelector() {
  const [selectedCampaignId, setSelectedCampaignId] = useState('campaign-1')

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        borderRadius: 1,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography noWrap sx={{ fontSize: 11, fontWeight: 600 }}>
          Nouveau Front Populaire
        </Typography>
        <Button
          size="small"
          color="inherit"
          sx={{ fontSize: 11, minWidth: 0, px: 0.5, borderRadius: 1 }}
        >
          Changer
        </Button>
      </Box>
      <Select
        size="small"
        value={selectedCampaignId}
        onChange={(event) => {
          setSelectedCampaignId(event.target.value)
        }}
        IconComponent={KeyboardArrowDownRounded}
        sx={{
          color: 'inherit',
          fontSize: 12,
          '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline':
            { borderColor: whiteOutline },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'common.white',
          },
          '& .MuiSelect-icon': { color: 'inherit' },
        }}
      >
        {campaigns.map((campaign) => (
          <MenuItem key={campaign.id} value={campaign.id}>
            {campaign.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
