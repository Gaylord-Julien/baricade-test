import { z } from 'zod'

import type { NewDoorToDoorReport } from '../types/doorToDoorReport'

export const DOOR_TO_DOOR_ROLES = ['individual', 'group'] as const
export const COMMENT_MAXIMUM_LENGTH = 500

const doorCountSchema = z
  .string()
  .trim()
  .regex(/^\d+$/, 'Indiquez un nombre entier positif')
  .transform(Number)

export const doorToDoorReportSchema = z
  .object({
    role: z
      .union([z.enum(DOOR_TO_DOOR_ROLES), z.literal('')])
      .pipe(z.enum(DOOR_TO_DOOR_ROLES, { error: 'Choisissez votre rôle' })),
    groupName: z.string().trim(),
    knockedDoorCount: doorCountSchema,
    openedDoorCount: doorCountSchema,
    comment: z
      .string()
      .trim()
      .max(
        COMMENT_MAXIMUM_LENGTH,
        `${String(COMMENT_MAXIMUM_LENGTH)} caractères maximum`,
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
