import type { components } from './api.generated'

export { doorToDoorRoleValues as doorToDoorRoles } from './api.generated'

export type DoorToDoorRole = components['schemas']['DoorToDoorRole']
export type DoorToDoorReport = components['schemas']['DoorToDoorReport']
export type NewDoorToDoorReport =
  components['schemas']['CreateDoorToDoorReportDto']
