import { listCloudinaryResources, listCloudinaryTags } from './listCloudinary.js'

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'public, max-age=60')
  res.end(JSON.stringify(payload))
}

export function cloudinaryApiPlugin(env) {
  return {
    name: 'cloudinary-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const [pathname, search = ''] = (req.url || '').split('?')
        if (pathname !== '/api/cloudinary') return next()

        const type = new URLSearchParams(search).get('type') === 'video' ? 'video' : 'image'

        try {
          const [items, tags] = await Promise.all([
            listCloudinaryResources(env, type),
            type === 'image' ? listCloudinaryTags(env, 'image').catch(() => []) : Promise.resolve([]),
          ])
          sendJson(res, 200, { items, tags, source: 'admin' })
        } catch (error) {
          const status = error.code === 'MISSING_CREDENTIALS' ? 501 : 502
          sendJson(res, status, {
            items: [],
            tags: [],
            error: error.message,
            code: error.code || 'CLOUDINARY_ERROR',
          })
        }
      })
    },
  }
}
