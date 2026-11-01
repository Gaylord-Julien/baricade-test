import type { AlertColor } from '@mui/material/Alert'
import { useCallback, useState } from 'react'

export interface Notification {
  message: string
  severity: AlertColor
}

export function useNotification() {
  const [notification, setNotification] = useState<Notification>()

  const notify = useCallback((message: string, severity: AlertColor) => {
    setNotification({ message, severity })
  }, [])

  const dismissNotification = useCallback(() => {
    setNotification(undefined)
  }, [])

  return { notification, notify, dismissNotification }
}
