import MenuRounded from '@mui/icons-material/MenuRounded'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { useState } from 'react'

import { floatingMargin, navigationSidebarWidth } from '../../constants/layout'
import { useIsCompactLayout } from '../../hooks/useIsCompactLayout'
import { NavigationContent } from './NavigationContent'

export function NavigationSidebar() {
  const isCompactLayout = useIsCompactLayout()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if (isCompactLayout) {
    return (
      <>
        <IconButton
          aria-label="Ouvrir le menu"
          onClick={() => {
            setIsDrawerOpen(true)
          }}
          sx={{
            position: 'absolute',
            top: floatingMargin,
            left: floatingMargin,
            zIndex: 1,
            bgcolor: 'common.white',
            boxShadow: 3,
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <MenuRounded />
        </IconButton>
        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false)
          }}
          slotProps={{
            paper: {
              component: 'nav',
              sx: { width: navigationSidebarWidth, maxWidth: '85vw' },
            },
          }}
        >
          <NavigationContent />
        </Drawer>
      </>
    )
  }

  return (
    <Paper
      component="nav"
      elevation={3}
      sx={{
        position: 'absolute',
        top: floatingMargin,
        left: floatingMargin,
        bottom: floatingMargin,
        width: navigationSidebarWidth,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <NavigationContent />
    </Paper>
  )
}
