import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

import { CampaignSelector } from './CampaignSelector'
import { NavigationFooterLinks } from './NavigationFooterLinks'
import { navigationSections } from './navigationSections'
import { NavigationSectionList } from './NavigationSectionList'

export function NavigationContent() {
  return (
    <>
      <Box sx={{ p: 1.25, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 400 }}>
          TokTok
        </Typography>
        <CampaignSelector />
      </Box>
      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {navigationSections.map((section) => (
          <NavigationSectionList key={section.title} section={section} />
        ))}
      </List>
      <Divider />
      <NavigationFooterLinks />
    </>
  )
}
