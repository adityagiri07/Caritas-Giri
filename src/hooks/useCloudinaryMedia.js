import { useEffect, useState } from 'react'
import { fetchCloudinaryMedia } from '../lib/cloudinary'

export function useCloudinaryMedia(type) {
  const [items, setItems] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchCloudinaryMedia(type)
      .then((result) => {
        if (cancelled) return
        setItems(result.items || [])
        setTags(result.tags || [])
      })
      .catch((err) => {
        if (cancelled) return
        setItems([])
        setTags([])
        setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [type])

  return { items, tags, loading, error }
}
