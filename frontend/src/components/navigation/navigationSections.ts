import ContactMailOutlined from '@mui/icons-material/ContactMailOutlined'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import MeetingRoomOutlined from '@mui/icons-material/MeetingRoomOutlined'
import SentimentSatisfiedAltOutlined from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import type { SvgIconComponent } from '@mui/icons-material'

export interface NavigationItem {
  label: string
  isSelected?: boolean
}

export interface NavigationSection {
  title: string
  icon: SvgIconComponent
  items: readonly NavigationItem[]
}

export interface FooterLink {
  label: string
  icon: SvgIconComponent
}

export const navigationSections: readonly NavigationSection[] = [
  {
    title: 'Agir',
    icon: MeetingRoomOutlined,
    items: [{ label: 'Carte', isSelected: true }],
  },
]

export const footerLinks: readonly FooterLink[] = [
  { label: 'Contact', icon: ContactMailOutlined },
  { label: 'Qui sommes-nous ?', icon: SentimentSatisfiedAltOutlined },
  { label: 'Mentions légales', icon: InfoOutlined },
]
