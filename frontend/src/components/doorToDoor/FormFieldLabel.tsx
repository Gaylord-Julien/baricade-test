import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

interface FormFieldLabelProperties {
  htmlFor: string
  children: ReactNode
}

export function FormFieldLabel({
  htmlFor,
  children,
}: FormFieldLabelProperties) {
  return (
    <Typography
      component="label"
      htmlFor={htmlFor}
      sx={{ display: 'block', mb: 0.5, fontSize: 13, color: 'primary.main' }}
    >
      {children}
    </Typography>
  )
}
