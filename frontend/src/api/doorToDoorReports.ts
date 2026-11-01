import type {
  DoorToDoorReport,
  NewDoorToDoorReport,
} from '../types/doorToDoorReport'
import { postJson } from './httpClient'

export function createDoorToDoorReport(
  report: NewDoorToDoorReport,
): Promise<DoorToDoorReport> {
  return postJson<DoorToDoorReport>('/api/door-to-door-reports', report)
}
