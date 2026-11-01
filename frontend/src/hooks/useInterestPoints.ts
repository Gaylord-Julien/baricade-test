import { useCallback, useEffect, useState } from 'react'

import { createInterestPoint, fetchInterestPoints } from '../api/interestPoints'
import type { InterestPoint, NewInterestPoint } from '../types/interestPoint'

export function useInterestPoints(onLoadError: () => void) {
  const [interestPoints, setInterestPoints] = useState<InterestPoint[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    const loadInterestPoints = async () => {
      try {
        setInterestPoints(await fetchInterestPoints(abortController.signal))
      } catch {
        if (!abortController.signal.aborted) {
          onLoadError()
        }
      }
    }
    void loadInterestPoints()
    return () => {
      abortController.abort()
    }
  }, [onLoadError])

  const addInterestPoint = useCallback(
    async (newInterestPoint: NewInterestPoint) => {
      const createdInterestPoint = await createInterestPoint(newInterestPoint)
      setInterestPoints((currentInterestPoints) => [
        ...currentInterestPoints,
        createdInterestPoint,
      ])
    },
    [],
  )

  return { interestPoints, addInterestPoint }
}
