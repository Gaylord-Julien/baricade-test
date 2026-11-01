import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'

import type { NavigationSection } from './navigationSections'

interface NavigationSectionListProperties {
  section: NavigationSection
}

export function NavigationSectionList({
  section,
}: NavigationSectionListProperties) {
  const [isExpanded, setIsExpanded] = useState(true)
  const SectionIcon = section.icon

  return (
    <>
      <ListItemButton
        onClick={() => {
          setIsExpanded((wasExpanded) => !wasExpanded)
        }}
        sx={{ py: 0.75 }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          <SectionIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={section.title}
          slotProps={{ primary: { sx: { fontWeight: 600, fontSize: 13 } } }}
        />
        {isExpanded ? (
          <ExpandLess fontSize="small" />
        ) : (
          <ExpandMore fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List disablePadding dense>
          {section.items.map((item) => (
            <ListItemButton
              key={item.label}
              selected={item.isSelected ?? false}
              sx={{ pl: 6.5, py: 0.25 }}
            >
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontSize: 12 } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}
