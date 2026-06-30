import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export function useIssuesFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const sort = searchParams.get('sort') || 'createdAt'
  const order = (searchParams.get('order') as 'asc' | 'desc') || 'desc'
  const search = searchParams.get('q') || ''

  const setFilter = useCallback(
    (updates: Record<string, string>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        Object.entries(updates).forEach(([k, v]) => {
          if (v) next.set(k, v)
          else next.delete(k)
        })
        return next
      })
    },
    [setSearchParams],
  )

  const toggleSort = useCallback(
    (column: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        if (next.get('sort') === column) {
          next.set('order', next.get('order') === 'asc' ? 'desc' : 'asc')
        } else {
          next.set('sort', column)
          next.set('order', 'asc')
        }
        next.set('page', '1')
        return next
      })
    },
    [setSearchParams],
  )

  return {
    page,
    limit,
    sort,
    order,
    search,
    setFilter,
    toggleSort,
    setSearchParams,
  }
}
