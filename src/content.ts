import type { IconName } from './components/Icon'

/* All copy lives here so it can be edited without touching components. */

export const brand = {
  name: 'Gallery App',
  tagline: 'Your photo gallery',
}

export const nav = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'Editing', href: '#edit' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Get the app', href: '#download' },
}

export const hero = {
  headline: 'Your photos,\nbeautifully organized.',
  subheadline:
    'Gallery App is a fast, clean photo gallery for your phone. Scroll through thousands of shots without a stutter, find any one in seconds, and keep albums that sort themselves. No ads, no clutter.',
  primary: { label: 'Get Gallery App', href: '#download' },
  secondary: { label: 'See how it works', href: '#how-it-works' },
  trust: [
    { icon: 'bolt', label: 'Smooth with 10,000+ photos' },
    { icon: 'wifi-off', label: 'Works offline' },
    { icon: 'cloud-upload', label: 'Optional backup' },
  ] as { icon: IconName; label: string }[],
  hint: 'Try it: tap a photo, then swipe',
}

export const phone = {
  libraryTitle: 'Library',
  librarySub: '2,481 photos · 36 albums',
  memoryTitle: 'On this day',
  memorySub: '3 years ago · 12 photos',
}

export const marquee = [
  'Smart search',
  'Auto albums',
  'RAW and HEIC',
  'One-tap edits',
  'Slideshows',
  'Works offline',
  'Cloud backup',
  'No ads',
]

export const features = {
  title: 'Everything a gallery should be',
  subtitle: 'Fast, tidy and out of your way, so your photos get all the attention.',
  search: {
    icon: 'search' as IconName,
    title: 'Find any photo in seconds',
    desc: 'Type what you remember, like beach or snow, and Gallery App finds it. Search runs on your phone, so it works offline too.',
  },
  tiles: [
    {
      area: 't2',
      icon: 'folders',
      title: 'Albums that sort themselves',
      desc: 'Trips, screenshots, videos and selfies land in their own albums automatically.',
    },
    {
      area: 't3',
      icon: 'zoom-in',
      title: 'Pinch, zoom, swipe',
      desc: 'Full-resolution zoom and smooth swiping, even through huge libraries.',
    },
    {
      area: 't4',
      icon: 'stack',
      title: 'Every format',
      desc: 'JPEG, PNG, HEIC, WebP, GIF, RAW and video. If your phone took it, Gallery App opens it.',
    },
    {
      area: 't5',
      icon: 'wifi-off',
      title: 'Works offline',
      desc: 'Browse, search and edit with airplane mode on.',
    },
    {
      area: 't6',
      icon: 'cloud-upload',
      title: 'Backup, when you want it',
      desc: 'Turn it on and your library syncs quietly in the background. Restore everything on any phone you own.',
    },
  ] as { area: string; icon: IconName; title: string; desc: string }[],
}

export type Look = { id: string; label: string }

export const edit = {
  title: 'Make it pop, in one tap.',
  subtitle: 'Auto-enhance, crop and filters are built in. Drag the slider to compare, then try a different look.',
  looks: [
    { id: 'vivid', label: 'Vivid' },
    { id: 'warm', label: 'Warm' },
    { id: 'cool', label: 'Cool' },
    { id: 'mono', label: 'Mono' },
    { id: 'fade', label: 'Fade' },
  ] as Look[],
  points: [
    { icon: 'sparkles', text: 'Auto-enhance fixes light and colour in one tap' },
    { icon: 'crop', text: 'Crop, straighten and rotate with a flick' },
    { icon: 'arrow-back-up', text: 'Your original is always kept, so every edit can be undone' },
  ] as { icon: IconName; text: string }[],
  labels: { before: 'Original', looks: 'Choose a look' },
}

export const howItWorks = {
  title: 'Ready in a minute',
  subtitle: 'Three steps from install to your whole library.',
  steps: [
    { n: '01', title: 'Install Gallery App', desc: 'Get it for Android or iPhone and enter your license key.' },
    { n: '02', title: 'Open your library', desc: 'Gallery App picks up every photo and video on your phone. Nothing to import.' },
    { n: '03', title: 'Make it yours', desc: 'Pin favourites, build albums and turn on backup if you want it.' },
  ],
}

export type Plan = {
  id: string
  name: string
  price: number
  period: string
  desc: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

export const pricing = {
  title: 'Pick your plan',
  subtitle: 'Pay on our website, then activate Gallery App on Android or iPhone with your license key.',
  plans: [
    {
      id: 'yearly',
      name: 'Yearly',
      price: 9.99,
      period: '/ year',
      desc: 'Billed once a year. Cancel anytime.',
      features: ['Unlimited photos and videos', 'Smart search and auto albums', 'Editing tools and filters', '10 GB cloud backup'],
      cta: 'Choose yearly',
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: 29,
      period: 'once',
      desc: 'Pay once, keep it forever.',
      features: ['Everything in Yearly', '50 GB cloud backup', 'All future updates', 'Priority support'],
      cta: 'Buy lifetime',
      featured: true,
      badge: 'Best value',
    },
  ] as Plan[],
  coupon: {
    title: 'Have a coupon?',
    desc: 'Discounts apply to both plans before you pay.',
    placeholder: 'Coupon code',
    button: 'Apply',
    payment: 'Checkout takes a minute. Your license key is emailed right after payment.',
    key: 'One license works on Android and iPhone.',
    /* Demo codes. Replace with a real validation call when wiring checkout. */
    codes: { GALLERY10: 10, WELCOME20: 20 } as Record<string, number>,
  },
}

export const faq = {
  title: 'Questions',
  subtitleBefore: 'Still unsure about something? ',
  contactLabel: 'Contact us',
  subtitleAfter: " and we'll get back to you.",
  contactHref: 'mailto:hello@galleryapp.app',
  items: [
    {
      q: 'Which formats does Gallery App open?',
      a: 'JPEG, PNG, HEIC, WebP, GIF and RAW files from most cameras (DNG, CR2, NEF, ARW), plus MP4 and MOV videos. Live and motion photos play too.',
    },
    {
      q: 'Will Gallery App move or change my photos?',
      a: 'No. Gallery App shows your library where it already lives. Edits are saved alongside the original, so you can always go back.',
    },
    {
      q: 'Does it work without an internet connection?',
      a: 'Yes. Browsing, searching, editing and slideshows all work offline. Only cloud backup needs a connection, and it waits until you have one.',
    },
    {
      q: 'What if I get a new phone?',
      a: 'If backup is on, install Gallery App on the new phone and enter your license key. Your photos come back along with your albums, favourites and edits.',
    },
    {
      q: 'Is one license enough for Android and iPhone?',
      a: 'Yes. One license key activates Gallery App on both platforms, on any phone you own.',
    },
  ],
}

export type Platform = {
  id: string
  icon: IconName
  name: string
  version: string
  size: string
  requires: string
  requiresShort: string
  buttons: { label: string; href: string; variant: 'primary' | 'secondary'; icon: IconName }[]
}

export const download = {
  title: 'Get Gallery App',
  subtitle: 'Download the app, then enter the license key from your email to activate it.',
  scanHint: 'Scan with your camera',
  platforms: [
    {
      id: 'android',
      icon: 'android',
      name: 'Android',
      version: '1.0.0',
      size: '18 MB',
      requires: 'Android 8 or later',
      requiresShort: 'Android 8+',
      buttons: [{ label: 'Download APK', href: '#', variant: 'primary', icon: 'download' }],
    },
    {
      id: 'iphone',
      icon: 'device-mobile',
      name: 'iPhone',
      version: '1.0.0',
      size: '24 MB',
      requires: 'iOS 15 or later',
      requiresShort: 'iOS 15+',
      buttons: [{ label: 'Download APK', href: '#', variant: 'primary', icon: 'download' }],
    },
  ] as Platform[],
}

export const footer = {
  links: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: 'mailto:hello@galleryapp.app' },
  ],
  copyright: `© ${new Date().getFullYear()} Gallery App`,
}
