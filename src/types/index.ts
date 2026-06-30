export interface Issue {
  id: number
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  dueDate: string
  createdAt: string
}

export interface IssuesFilter {
  page: number
  limit: number
  sort: string
  order: 'asc' | 'desc'
  search: string
  status?: string
  priority?: string
  assignee?: string
}

export interface IssuesState {
  items: Issue[]
  total: number
  loading: boolean
  error: string | null
  currentIssue: Issue | null
}

export interface ToastState {
  open: boolean
  message: string
  severity: 'success' | 'error'
}

export interface RootState {
  toast: ToastState
  issues: IssuesState
}
