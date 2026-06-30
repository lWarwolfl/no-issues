import { z } from 'zod'

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['Open', 'In Progress', 'Done', 'Closed']),
  priority: z.enum(['Critical', 'High', 'Medium', 'Low']),
  assignee: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
})

export type IssueFormData = z.infer<typeof issueSchema>

export const statusOptions = ['Open', 'In Progress', 'Done', 'Closed'] as const
export const priorityOptions = ['Critical', 'High', 'Medium', 'Low'] as const
