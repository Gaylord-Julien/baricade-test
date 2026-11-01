import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  type DoorToDoorReportFormInput,
  type DoorToDoorReportFormOutput,
  doorToDoorReportSchema,
  emptyDoorToDoorReportForm,
} from '../schemas/doorToDoorReportSchema'

export function useDoorToDoorReportForm() {
  return useForm<
    DoorToDoorReportFormInput,
    unknown,
    DoorToDoorReportFormOutput
  >({
    resolver: zodResolver(doorToDoorReportSchema),
    defaultValues: emptyDoorToDoorReportForm,
    mode: 'onTouched',
  })
}

export type DoorToDoorReportFormControl = ReturnType<
  typeof useDoorToDoorReportForm
>['control']
