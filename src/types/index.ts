export type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
export type Status = 'Open' | 'In Progress' | 'Done' | 'Closed'

export interface Issue {
  id: number
  title: string
  description: string
  status: Status
  priority: Priority
  assignee: string
  dueDate: string
  createdAt: string
}

export type UpdateIssueData = Partial<Omit<Issue, 'id' | 'createdAt'>>
export type CreateIssueData = Omit<Issue, 'id' | 'createdAt'>

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
  initiallyLoaded: boolean
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
