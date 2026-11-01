import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

import type { DoorToDoorReportFormControl } from '../../hooks/useDoorToDoorReportForm'
import type { DoorToDoorReportFormInput } from '../../schemas/doorToDoorReportSchema'
import { FormFieldLabel } from './FormFieldLabel'

type FormTextFieldProperties = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'label' | 'id'
> & {
  name: keyof DoorToDoorReportFormInput
  id: string
  label: string
  control: DoorToDoorReportFormControl
}

export function FormTextField({
  name,
  label,
  control,
  id,
  ...textFieldProperties
}: FormTextFieldProperties) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <FormFieldLabel htmlFor={id}>{label}</FormFieldLabel>
          <TextField
            {...textFieldProperties}
            {...field}
            id={id}
            fullWidth
            size="small"
            error={fieldState.error !== undefined}
            helperText={fieldState.error?.message}
          />
        </div>
      )}
    />
  )
}
