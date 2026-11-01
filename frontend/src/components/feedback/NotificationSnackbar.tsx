import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import type { Notification } from '../../hooks/useNotification'

interface NotificationSnackbarProperties {
  notification: Notification | undefined
  onClose: () => void
}

export function NotificationSnackbar({
  notification,
  onClose,
}: NotificationSnackbarProperties) {
  return (
    <Snackbar
      open={notification !== undefined}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={notification?.severity ?? 'info'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  )
}
