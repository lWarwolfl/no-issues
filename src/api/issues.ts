import client from '@/api/client'
import { Issue, IssuesFilter, UpdateIssueData, CreateIssueData } from '@/types'

export async function fetchIssues(filter: IssuesFilter) {
  const params: Record<string, string | number> = {
    _page: filter.page,
    _limit: filter.limit,
    _sort: filter.sort,
    _order: filter.order,
  }
  if (filter.search) params.q = filter.search
  if (filter.status) params.status = filter.status
  if (filter.priority) params.priority = filter.priority
  if (filter.assignee) params.assignee_like = filter.assignee
  const res = await client.get<Issue[]>('/issues', { params })
  return { items: res.data, total: Number(res.headers['x-total-count']) }
}

export async function fetchIssue(id: number) {
  const res = await client.get<Issue>(`/issues/${id}`)
  return res.data
}

export async function createIssue(data: CreateIssueData) {
  const res = await client.post<Issue>('/issues', { ...data, createdAt: new Date().toISOString() })
  return res.data
}

export async function updateIssue(id: number, data: UpdateIssueData) {
  const res = await client.patch<Issue>(`/issues/${id}`, data)
  return res.data
}

export async function deleteIssue(id: number) {
  await client.delete(`/issues/${id}`)
}
