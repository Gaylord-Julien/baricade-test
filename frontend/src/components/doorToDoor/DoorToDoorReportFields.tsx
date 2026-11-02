import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { useWatch } from 'react-hook-form'

import type { DoorToDoorReportFormControl } from '../../hooks/useDoorToDoorReportForm'
import { MAXIMUM_COMMENT_LENGTH } from '../../schemas/doorToDoorReportSchema'
import type { DoorToDoorRole } from '../../types/doorToDoorReport'
import { FormTextField } from './FormTextField'

const roleOptions: readonly { value: DoorToDoorRole; label: string }[] = [
  { value: 'individual', label: 'Initiative individuelle' },
  { value: 'group', label: 'Au nom d’un groupe' },
]

function renderRole(role: unknown): ReactNode {
  const option = roleOptions.find((roleOption) => roleOption.value === role)
  return option ? (
    option.label
  ) : (
    <Typography component="span" sx={{ color: 'text.secondary' }}>
      Votre rôle
    </Typography>
  )
}

const numberInputProperties = {
  htmlInput: { min: 0, step: 1, inputMode: 'numeric' },
} as const

interface DoorToDoorReportFieldsProperties {
  control: DoorToDoorReportFormControl
}

export function DoorToDoorReportFields({
  control,
}: DoorToDoorReportFieldsProperties) {
  const role = useWatch({ control, name: 'role' })

  return (
    <Stack sx={{ gap: 2 }}>
      <FormTextField
        name="role"
        label="Qui ?"
        id="report-role"
        control={control}
        select
        slotProps={{
          select: { displayEmpty: true, renderValue: renderRole },
        }}
      >
        {roleOptions.map((roleOption) => (
          <MenuItem key={roleOption.value} value={roleOption.value}>
            {roleOption.label}
          </MenuItem>
        ))}
      </FormTextField>
      {role === 'group' && (
        <FormTextField
          name="groupName"
          label="Nom du groupe"
          id="report-group-name"
          control={control}
        />
      )}
      <FormTextField
        name="knockedDoorCount"
        label="Portes frappées"
        id="report-knocked-doors"
        control={control}
        type="number"
        slotProps={numberInputProperties}
      />
      <FormTextField
        name="openedDoorCount"
        label="Portes ouvertes"
        id="report-opened-doors"
        control={control}
        type="number"
        slotProps={numberInputProperties}
      />
      <FormTextField
        name="comment"
        label="Commentaire"
        id="report-comment"
        control={control}
        multiline
        minRows={3}
        slotProps={{ htmlInput: { maxLength: MAXIMUM_COMMENT_LENGTH } }}
      />
    </Stack>
  )
}
