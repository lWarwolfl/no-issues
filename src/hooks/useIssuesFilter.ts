import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export function useIssuesFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const sort = searchParams.get('sort') || 'createdAt'
  const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc'
  const search = searchParams.get('q') || ''
  const status = searchParams.get('status') || ''
  const priority = searchParams.get('priority') || ''
  const assignee = searchParams.get('assignee') || ''

  const setFilter = useCallback(
    (updates: Record<string, string>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        for (const [key, value] of Object.entries(updates)) {
          if (value) next.set(key, value)
          else next.delete(key)
        }
        return next
      })
    },
    [setSearchParams],
  )

  const toggleSort = useCallback(
    (field: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        if (next.get('sort') === field) {
          next.set('order', next.get('order') === 'asc' ? 'desc' : 'asc')
        } else {
          next.set('sort', field)
          next.set('order', 'asc')
        }
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
    status,
    priority,
    assignee,
    setFilter,
    toggleSort,
  } as const
}
