import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { footerLinks } from './navigationSections'

export function NavigationFooterLinks() {
  return (
    <List dense disablePadding sx={{ py: 1 }}>
      {footerLinks.map(({ label, icon: LinkIcon }) => (
        <ListItemButton key={label} sx={{ py: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={label}
            slotProps={{ primary: { sx: { fontSize: 12 } } }}
          />
        </ListItemButton>
      ))}
    </List>
  )
}
