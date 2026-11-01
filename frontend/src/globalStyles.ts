import type { GlobalStylesProps } from '@mui/material/GlobalStyles'

export const globalStyles: GlobalStylesProps['styles'] = {
  'html, body, #root': { height: '100%' },
  body: { overflow: 'hidden' },
  '.maplibregl-popup-content': {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 13,
    borderRadius: 8,
    padding: '10px 14px',
  },
}
