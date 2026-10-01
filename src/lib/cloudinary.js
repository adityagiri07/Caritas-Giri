import { mapImageResource, mapVideoResource, uniqueTagsFrom } from './cloudinaryMap'

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const imageTag = import.meta.env.VITE_CLOUDINARY_IMAGE_TAG || 'visual-stories'
const videoTag = import.meta.env.VITE_CLOUDINARY_VIDEO_TAG || 'cinematics'

function mergeTags(apiTags, items) {
  return [...new Set([...(apiTags || []), ...uniqueTagsFrom(items)])].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  )
}

async function fetchTagList(type) {
  if (!cloudName) return null
  const tag = type === 'video' ? videoTag : imageTag
  const url = `https://res.cloudinary.com/${cloudName}/${type}/list/${encodeURIComponent(tag)}.json`
  const response = await fetch(url)
  if (!response.ok) return null
  const data = await response.json()
  const mapper = type === 'video' ? mapVideoResource : mapImageResource
  return (data.resources || []).map((item) => mapper(item, cloudName))
}

export async function fetchCloudinaryMedia(type) {
  let adminItems = null
  let adminTags = []

  try {
    const response = await fetch(`/api/cloudinary?type=${type}`)
    if (response.ok) {
      const data = await response.json()
      if (Array.isArray(data.tags)) adminTags = data.tags
      if (Array.isArray(data.items)) {
        const tags = mergeTags(adminTags, data.items)
        if (data.items.length || tags.length) {
          return { items: data.items, tags, source: data.source || 'admin' }
        }
        adminItems = data.items
      }
    }
  } catch {
    // Fall through to public tag list
  }

  const tagged = await fetchTagList(type)
  if (tagged?.length) {
    return { items: tagged, tags: uniqueTagsFrom(tagged), source: 'tag' }
  }
  if (adminItems) return { items: [], tags: adminTags, source: 'admin' }
  if (tagged) return { items: [], tags: [], source: 'tag' }

  throw new Error(
    cloudName
      ? 'Could not load Cloudinary media. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env, then restart the dev server.'
      : 'Set VITE_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in a .env file, then restart npm run dev.',
  )
}
