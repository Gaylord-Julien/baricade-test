import type { components } from './api.generated'

export { interestPointStatusValues as interestPointStatuses } from './api.generated'

export type InterestPointStatus = components['schemas']['InterestPointStatus']
export type InterestPoint = components['schemas']['InterestPoint']
export type NewInterestPoint = components['schemas']['CreateInterestPointDto']
