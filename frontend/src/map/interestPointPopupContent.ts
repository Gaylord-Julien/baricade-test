import {
  interestPointStatusColors,
  interestPointStatusLabels,
  isInterestPointStatus,
} from '../constants/interestPointStatuses'

export function createInterestPointPopupContent(
  properties: Record<string, unknown>,
): HTMLElement {
  const content = document.createElement('div')
  content.className = 'interest-point-popup'

  const status = properties['status']
  const title = document.createElement('strong')
  if (isInterestPointStatus(status)) {
    title.textContent = interestPointStatusLabels[status]
    title.style.color = interestPointStatusColors[status]
  } else {
    title.textContent = 'Statut inconnu'
  }
  content.append(title)

  const label = properties['label']
  if (typeof label === 'string' && label.length > 0) {
    const labelElement = document.createElement('div')
    labelElement.textContent = label
    content.append(labelElement)
  }

  return content
}
