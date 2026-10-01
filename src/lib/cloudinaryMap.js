const CATEGORIES = ['portraits', 'cinematics', 'street', 'commercial']

export function prettyName(publicId) {
  const leaf = publicId.split('/').pop() || publicId
  return leaf
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function uniqueTagsFrom(items) {
  const set = new Set()
  items.forEach((item) => {
    ;(item.tags || []).forEach((tag) => {
      if (tag) set.add(tag)
    })
  })
  return [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

function contextMap(resource) {
  const raw = resource.context?.custom || resource.context || {}
  if (typeof raw !== 'object' || Array.isArray(raw)) return {}
  return raw
}

function pickDescription(context, resource) {
  const candidates = [
    context.description,
    context.caption,
    context.summary,
    resource.image_metadata?.['Caption-Abstract'],
    resource.image_metadata?.ImageDescription,
    resource.image_metadata?.Description,
  ]

  const metadata = resource.metadata
  if (metadata && typeof metadata === 'object') {
    for (const key of ['description', 'Description', 'caption', 'Caption', 'summary']) {
      const value = metadata[key]
      if (typeof value === 'string') candidates.push(value)
      else if (value && typeof value === 'object') candidates.push(value.value)
    }
  }

  return candidates.map((value) => String(value || '').trim()).find((value) => value.length > 0) || ''
}

function categoryFrom(resource) {
  const tags = resource.tags || []
  const publicId = resource.public_id || ''
  const fromTag = CATEGORIES.find((id) => tags.includes(id))
  if (fromTag) return fromTag
  const fromPath = CATEGORIES.find((id) => publicId.split('/').includes(id))
  return fromPath || 'all'
}

export function deliveryImageUrl(cloudName, publicId, width = 1800) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_limit,w_${width}/${publicId}`
}

export function deliveryVideoUrl(cloudName, publicId, format = 'mp4') {
  const ext = format && format !== 'm3u8' ? format : 'mp4'
  return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}.${ext}`
}

export function deliveryPosterUrl(cloudName, publicId) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_1,f_auto,q_auto,w_1600/${publicId}.jpg`
}

export function mapImageResource(resource, cloudName) {
  const context = contextMap(resource)
  const description = pickDescription(context, resource)
  const title =
    context.title ||
    (description && description.length < 50 ? description : '') ||
    prettyName(resource.public_id)
  return {
    id: resource.asset_id || resource.public_id,
    publicId: resource.public_id,
    src: deliveryImageUrl(cloudName, resource.public_id, 1400),
    fullSrc: deliveryImageUrl(cloudName, resource.public_id, 2400),
    title,
    description,
    alt: context.alt || title,
    tags: resource.tags || [],
    label: (resource.tags?.[0] || resource.public_id.split('/')[0] || 'Still').replace(/[-_]/g, ' '),
    category: categoryFrom(resource),
    meta: context.credit || context.gear || '',
    createdAt: resource.created_at,
    width: resource.width,
    height: resource.height,
  }
}

export function mapVideoResource(resource, cloudName) {
  const context = contextMap(resource)
  const title = context.caption || context.title || prettyName(resource.public_id)
  const duration = Number(resource.duration) || 0
  return {
    id: resource.asset_id || resource.public_id,
    publicId: resource.public_id,
    src: deliveryVideoUrl(cloudName, resource.public_id, resource.format),
    poster: deliveryPosterUrl(cloudName, resource.public_id),
    title,
    duration,
    createdAt: resource.created_at,
    format: (resource.format || 'mp4').toUpperCase(),
    bytes: resource.bytes,
  }
}
