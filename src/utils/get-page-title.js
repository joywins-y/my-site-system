import defaultSettings from '@/settings'

const title = defaultSettings.title || 'My Site System'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
