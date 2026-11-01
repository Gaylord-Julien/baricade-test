import type { InterestPointStatus } from '../types/interestPoint'

export const interestPointStatuses: readonly InterestPointStatus[] = [
  'favorable',
  'undecided',
  'unfavorable',
  'absent',
]

export const interestPointStatusLabels: Record<InterestPointStatus, string> = {
  favorable: 'Favorable',
  undecided: 'Indécis',
  unfavorable: 'Défavorable',
  absent: 'Absent',
}

export const interestPointStatusColors: Record<InterestPointStatus, string> = {
  favorable: '#22b14c',
  undecided: '#ffb000',
  unfavorable: '#ff8a1f',
  absent: '#9e9e9e',
}

export function isInterestPointStatus(
  value: unknown,
): value is InterestPointStatus {
  return interestPointStatuses.some((status) => status === value)
}
