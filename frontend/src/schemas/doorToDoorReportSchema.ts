import { z } from 'zod'

import {
  doorToDoorRoles,
  type NewDoorToDoorReport,
} from '../types/doorToDoorReport'

export const MAXIMUM_COMMENT_LENGTH = 500

const doorCountSchema = z
  .string()
  .trim()
  .regex(/^\d+$/, 'Indiquez un nombre entier positif')
  .transform(Number)

export const doorToDoorReportSchema = z
  .object({
    role: z
      .union([z.enum(doorToDoorRoles), z.literal('')])
      .pipe(z.enum(doorToDoorRoles, { error: 'Choisissez votre rôle' })),
    groupName: z.string().trim(),
    knockedDoorCount: doorCountSchema,
    openedDoorCount: doorCountSchema,
    comment: z
      .string()
      .trim()
      .max(
        MAXIMUM_COMMENT_LENGTH,
        `${String(MAXIMUM_COMMENT_LENGTH)} caractères maximum`,
      ),
  })
  .superRefine((values, context) => {
    if (values.role === 'group' && values.groupName === '') {
      context.addIssue({
        code: 'custom',
        path: ['groupName'],
        message: 'Indiquez le nom du groupe',
      })
    }
    if (values.openedDoorCount > values.knockedDoorCount) {
      context.addIssue({
        code: 'custom',
        path: ['openedDoorCount'],
        message: 'Ne peut pas dépasser le nombre de portes frappées',
      })
    }
  })

export type DoorToDoorReportFormInput = z.input<typeof doorToDoorReportSchema>
export type DoorToDoorReportFormOutput = z.output<typeof doorToDoorReportSchema>

export const emptyDoorToDoorReportForm: DoorToDoorReportFormInput = {
  role: '',
  groupName: '',
  knockedDoorCount: '',
  openedDoorCount: '',
  comment: '',
}

export function toNewDoorToDoorReport({
  role,
  groupName,
  knockedDoorCount,
  openedDoorCount,
  comment,
}: DoorToDoorReportFormOutput): NewDoorToDoorReport {
  return {
    role,
    knockedDoorCount,
    openedDoorCount,
    ...(role === 'group' && { groupName }),
    ...(comment !== '' && { comment }),
  }
}
