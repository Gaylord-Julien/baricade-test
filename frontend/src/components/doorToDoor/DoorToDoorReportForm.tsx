import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useDoorToDoorReportForm } from '../../hooks/useDoorToDoorReportForm'
import {
  type DoorToDoorReportFormOutput,
  toNewDoorToDoorReport,
} from '../../schemas/doorToDoorReportSchema'
import type { NewDoorToDoorReport } from '../../types/doorToDoorReport'
import type { GeographicCoordinates } from '../../types/geography'
import { DoorToDoorReportFields } from './DoorToDoorReportFields'
import { ReportLocationHint } from './ReportLocationHint'

interface DoorToDoorReportFormProperties {
  location: GeographicCoordinates | undefined
  onSubmit: (report: NewDoorToDoorReport) => Promise<void>
  onClose: () => void
}

export function DoorToDoorReportForm({
  location,
  onSubmit,
  onClose,
}: DoorToDoorReportFormProperties) {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useDoorToDoorReportForm()

  const submitReport = async (values: DoorToDoorReportFormOutput) => {
    await onSubmit({ ...toNewDoorToDoorReport(values), ...location })
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(event) => {
        void handleSubmit(submitReport)(event)
      }}
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 400, mb: 2 }}>
          Mon bilan porte à porte
        </Typography>
        <Stack sx={{ gap: 2 }}>
          <DoorToDoorReportFields control={control} />
          <ReportLocationHint location={location} />
        </Stack>
      </Box>
      <Divider />
      <Stack direction="row" sx={{ gap: 1, p: 2 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
        >
          Envoyer mon bilan
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Quitter
        </Button>
      </Stack>
    </Box>
  )
}
