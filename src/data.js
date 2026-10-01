export const IMAGES = {
  heroCutout: '/pic1.png',
  goldenHour:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDuoOPqY2diJupbynhMyP0GgQwCo-H7pN6WamyiP7z8MMcyijO-8TpxboLL9NCvnnDnBzEqtd15ma9L436t4-eWebxCd25GxHHFIl77h_EGb0tgDrGS1HGKRcTfY2mu4VLWFO7HwufmX6Y51DTsQ6SoQr5Du0FN_YgurfSCna_F2V_L24Q_wCHf_FDS3fsxuPAWf1yW_C0tP06l6d_H7ih1QXodugvJccJv23RcMNg69lK24ZfU5gCi',
  nocturne:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDF1OT5G9rOPkwYrO3g2IxfeK2lxd2QSg1YzzAv8Lf8De7YuxMHPzbQuk5e9m6r7m-c9b0dYCODDIP-5XYWEk5ohjfHjRD9_j8mC_c1MwD2gWDlykc8I3XwS8HNy3VsT1RVa6Y274_xvEi7MuuIEYXUbdNCGczzBE6S6aWSaUYrP1vZMNYR_0NFShjgDReT_J007VXH1XFd-UeUy6szv0tB9hjad6hcxR6arSFcbwMTML1HlXH1POPe',
  cyanNeon:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCNXCfuE9AJ7ynKOAgOoa5YQ7f3m3lAWsrS4WbHV6ljq4S3k79sIqqMDpLeRJRu_T9kiaQ3vfk81oVTvxcYXHyU1WV8fCrMashp_rRCff1jLN8B5dnHrd_8lTIsIhsIPd7nmaW483AHLJylpVcOstBAkq-TCKNUB1t1YK3oyk2-WSuAqfQZtQtMpDH842rBXrOeEHnClMYXzjq1ON0LANJOhw2KWqLKHpo81OmDHZVqsIO7CPI089C3',
  valley:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBO8McFRFGVdgS4QC5ye20CvKJr1cIb1QgHfzzVvyHHmWLlm2MkAwyG81ZBeNtffl0VB0BwPdfFdJ7bSGAv3u2JpQUw0sK19DcuZSaJMIQCcDG8D7ZWkly7ziFW_4mKJC_N3Fmd96fAqsQs2FQiwOaBHhrNms8axWPghaxolq8C6jpUVRdKfQtPrYDi-XWgsIhi7P-YP5nlCYPMWbbSbhYyxi_PiOlDmQC6UT-UoHwLUi0pVz62xTn0',
  timepieces:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAfnhpodZmZa1Xnsvn-VwfSyAI-4z8E8wtKHYLemXjPRagAAQjx_zxxvWsj9WA3dgvvPFPbFkfKAu60ZwHCe26j5tgNJiPthMswY5-AfHA06v6Jyzbz3zwCzNo0HdQ_7MrulIaw7hTmWn3r80uiVrp59c6UrjjjaSwcILrIZ_2SYlWT8Faa5tvkAQi6uCdqrK9L9r_cCz8kTFsbFLgorEVmebuw5VY2EmC-c_PjACdIooNDXmk7eD4e',
  showreel:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDj2VwpkIvlPyGAaDPaFFgzl7QzZqKPGXxSpZ71UbhWQX3lgaoz8CdlSJ_w8KLo1MBuqnpEwyPmOmXb4i7QHgR0a3qUbZwf92AP87qNCDisJU1eIbPhFZv6y4XiZ7KEVfYPQMyiHkfV8UdRN4ZPGHqtvDtvTYlOc6c6rJIKHZk2NPAY6Ydhf39cbAoz-2izzYyzF39O2RFP4g7qVhg68nWPu8BWayERhpwnZ-APZb95cNoLYMOaTnp',
  aboutPortrait: '/aboutPic.png',
}

export const NAV_LINKS = [
  { href: '#work', label: 'My Clicks', id: 'work' },
  { href: '#cinematics', label: 'Cinematics', id: 'cinematics' },
  { href: '#about', label: 'About Me', id: 'about' },
  { href: '#gear', label: 'Gear & Craft', id: 'gear' },
]

export const FILTERS = [
  { id: 'all', label: 'All Works' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'cinematics', label: 'Cinematic Films' },
  { id: 'street', label: 'Street & Travel' },
  { id: 'commercial', label: 'Commercial & Editorial' },
]

export const GALLERY = [
  {
    category: 'portraits',
    className: 'md:col-span-2 lg:col-span-2 h-[420px]',
    delay: '50ms',
    src: IMAGES.goldenHour,
    alt: 'Cinematic Portrait Study',
    badge: 'Editorial Portrait',
    badgeClass: 'bg-brand-royal/80 text-white group-hover:bg-brand-royal',
    title: 'The Golden Hour In Monochrome',
    titleTag: 'h3',
    meta: 'Sony A7IV • 50mm f/1.2 GM • Natural Rim Lighting',
  },
  {
    category: 'street',
    className: 'md:col-span-1 lg:col-span-2 h-[420px]',
    delay: '150ms',
    src: IMAGES.nocturne,
    alt: 'Urban Exploration',
    badge: 'Street Architecture',
    badgeClass: 'bg-slate-800 text-blue-300 border border-white/10 group-hover:border-blue-400 group-hover:text-white',
    title: 'Nocturne Metropolis',
    titleTag: 'h3',
    meta: 'Sony FX3 • 24-70mm f/2.8 • Cine-EI S-Log3',
  },
  {
    category: 'portraits',
    className: 'md:col-span-1 lg:col-span-1 h-[340px]',
    delay: '200ms',
    src: IMAGES.cyanNeon,
    alt: 'Studio Glow',
    label: 'Portraits',
    title: 'Cyan & Neon Silhouette',
    titleTag: 'h4',
  },
  {
    category: 'cinematics',
    className: 'md:col-span-2 lg:col-span-2 h-[340px]',
    delay: '300ms',
    src: IMAGES.valley,
    alt: 'Documentary Series',
    label: 'Documentary',
    title: 'Caritas: The Valley Beyond Silence',
    titleTag: 'h4',
    meta: 'Expedition visual diary captured across the Himalayan frontier.',
  },
  {
    category: 'commercial',
    className: 'md:col-span-1 lg:col-span-1 h-[340px]',
    delay: '400ms',
    src: IMAGES.timepieces,
    alt: 'Commercial Craft',
    label: 'Brand Editorial',
    title: 'Minimalist Timepieces',
    titleTag: 'h4',
  },
]

export const CHAPTERS = ['01 // Dawn in Ladakh', '02 // Metropolis At Night', '03 // Fashion Noir']

export const GEAR = [
  {
    title: 'Capturing',
    accent: 'blue',
    icon: 'camera',
    items: ['Empty Streets',
      'Unposed People',
      'Daily Routine',
      'Fleeting Light'],
  },
  {
    title: 'Posts',
    accent: 'cyan',
    icon: 'lens',
    items: ['Cinematic Stills',
      'Moody Tones',
      'Film Grain',
      'Slow Motion'],
  },
  {
    title: 'Lighting',
    accent: 'blue',
    icon: 'star',
    items: ['Golden Hour',
      'Sun Shines',
      'Window Light',
      'Street Lights'],
  },
]
