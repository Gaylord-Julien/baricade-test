import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { type SubmitEvent, useState } from 'react'

import {
  interestPointStatuses,
  isInterestPointStatus,
} from '../../constants/interestPointStatuses'
import type { InterestPointStatus } from '../../types/interestPoint'
import { StatusOption } from './StatusOption'

export interface InterestPointDetails {
  status: InterestPointStatus
  label?: string
}

interface InterestPointDialogProperties {
  isOpen: boolean
  onSubmit: (details: InterestPointDetails) => Promise<void>
  onCancel: () => void
}

export function InterestPointDialog({
  isOpen,
  onSubmit,
  onCancel,
}: InterestPointDialogProperties) {
  const [status, setStatus] = useState<InterestPointStatus>('favorable')
  const [label, setLabel] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitDetails = async () => {
    const trimmedLabel = label.trim()
    setIsSubmitting(true)
    try {
      await onSubmit(
        trimmedLabel === '' ? { status } : { status, label: trimmedLabel },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submitDetails()
  }

  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nouveau point d&apos;intérêt</DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label="Statut"
            value={status}
            onChange={(event) => {
              const selectedStatus = event.target.value
              if (isInterestPointStatus(selectedStatus)) {
                setStatus(selectedStatus)
              }
            }}
          >
            {interestPointStatuses.map((statusOption) => (
              <FormControlLabel
                key={statusOption}
                value={statusOption}
                control={<Radio size="small" />}
                label={<StatusOption status={statusOption} />}
              />
            ))}
          </RadioGroup>
          <TextField
            label="Libellé (facultatif)"
            fullWidth
            size="small"
            margin="normal"
            value={label}
            onChange={(event) => {
              setLabel(event.target.value)
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
