import { listCloudinaryResources, listCloudinaryTags } from '../server/listCloudinary.js'

export default async function handler(req, res) {
  const type = req.query?.type === 'video' ? 'video' : 'image'

  try {
    const [items, tags] = await Promise.all([
      listCloudinaryResources(process.env, type),
      type === 'image' ? listCloudinaryTags(process.env, 'image').catch(() => []) : Promise.resolve([]),
    ])
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    res.status(200).json({ items, tags, source: 'admin' })
  } catch (error) {
    const status = error.code === 'MISSING_CREDENTIALS' ? 501 : 502
    res.status(status).json({
      items: [],
      tags: [],
      error: error.message,
      code: error.code || 'CLOUDINARY_ERROR',
    })
  }
}
