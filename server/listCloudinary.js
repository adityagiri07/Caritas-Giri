import { mapImageResource, mapVideoResource } from '../src/lib/cloudinaryMap.js'

async function cloudinaryGet(env, path, extraParams = {}) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME || env.VITE_CLOUDINARY_CLOUD_NAME
  const apiKey = env.CLOUDINARY_API_KEY
  const apiSecret = env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    const error = new Error('Cloudinary API credentials are missing')
    error.code = 'MISSING_CREDENTIALS'
    throw error
  }

  const params = new URLSearchParams(extraParams)
  const url = `https://api.cloudinary.com/v1_1/${cloudName}${path}${params.toString() ? `?${params}` : ''}`
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
  const response = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
  })
  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data.error?.message || `Cloudinary ${response.status}`)
    error.status = response.status
    throw error
  }
  return data
}

export async function listCloudinaryTags(env, resourceType = 'image') {
  const tags = []
  let nextCursor

  do {
    const extra = { max_results: '500' }
    if (nextCursor) extra.next_cursor = nextCursor
    const data = await cloudinaryGet(env, `/tags/${resourceType}`, extra)
    tags.push(
      ...(data.tags || [])
        .map((entry) => (typeof entry === 'string' ? entry : entry?.tag || entry?.name || ''))
        .filter(Boolean),
    )
    nextCursor = data.next_cursor
  } while (nextCursor)

  return [...new Set(tags.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  )
}

export async function listCloudinaryResources(env, resourceType) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME || env.VITE_CLOUDINARY_CLOUD_NAME
  const prefix =
    resourceType === 'video'
      ? env.CLOUDINARY_VIDEO_FOLDER || ''
      : env.CLOUDINARY_IMAGE_FOLDER || ''

  const resources = []
  let nextCursor

  do {
    const extra = {
      type: 'upload',
      max_results: '100',
      direction: 'desc',
      tags: 'true',
      context: 'true',
      metadata: 'true',
      image_metadata: 'true',
    }
    if (prefix) extra.prefix = prefix.replace(/\/$/, '')
    if (nextCursor) extra.next_cursor = nextCursor

    const data = await cloudinaryGet(env, `/resources/${resourceType}`, extra)
    resources.push(...(data.resources || []))
    nextCursor = data.next_cursor
  } while (nextCursor)

  const mapper = resourceType === 'video' ? mapVideoResource : mapImageResource
  return resources
    .filter((item) => item.type === 'upload')
    .map((item) => mapper(item, cloudName))
}
